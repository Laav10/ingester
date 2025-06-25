#!/usr/bin/env python3
"""
Comprehensive Astronomical Data Ingester

This script processes FITS files, updates headers with complete metadata,
and uploads to both Science Archive (port 9501) and MinIO storage (port 9000).
Includes Observer field and ensures all metadata is present in both header and metadata.
"""

import requests
import datetime
import json
import sys
import os
import hashlib
from astropy.io import fits
from minio import Minio
from minio.error import S3Error
import io

class AstronomicalIngester:
    def __init__(self):
        # Science Archive configuration (port 9500)
        self.science_archive_url = "http://localhost:9500/frames/"
        self.science_archive_token = "dce22c368ae9d65ef9cd114892e8b77a2526e080"
        
        # MinIO configuration (port 9000)
        self.minio_client = Minio(
            "localhost:9000",
            access_key="Laav10user",
            secret_key="Laav10pass",
            secure=False
        )
        self.minio_bucket = "astronomical-data"
        
        # Ensure MinIO bucket exists
        self._ensure_minio_bucket()
    
    def _ensure_minio_bucket(self):
        """Ensure the MinIO bucket exists"""
        try:
            if not self.minio_client.bucket_exists(self.minio_bucket):
                self.minio_client.make_bucket(self.minio_bucket)
                print(f"✓ Created MinIO bucket: {self.minio_bucket}")
        except S3Error as e:
            print(f"✗ MinIO bucket error: {e}")
    
    def calculate_md5(self, file_path):
        """Calculate MD5 hash of file"""
        hash_md5 = hashlib.md5()
        with open(file_path, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                hash_md5.update(chunk)
        return hash_md5.hexdigest()
    
    def update_fits_header(self, file_path, metadata, header_data):
        """
        Update FITS file header with complete metadata including Observer field
        """
        print(f"Updating FITS header for: {file_path}")
        
        # Use provided header data instead of hardcoded values
        header_update_data = {
            "SIMPLE": header_data.get("SIMPLE", True),
            "BITPIX": header_data.get("BITPIX", -32),
            "NAXIS": header_data.get("NAXIS", 2),
            "NAXIS1": header_data.get("NAXIS1", 1024),
            "NAXIS2": header_data.get("NAXIS2", 1024),
            "OBJECT": metadata.get("OBJECT", header_data.get("OBJECT", "Unknown")),
            "TELESCOP": header_data.get("TELESCOP", "1.2m"),
            "INSTRUME": metadata.get("INSTRUME", header_data.get("INSTRUME", "Unknown")),
            "FILTER": metadata.get("FILTER", header_data.get("FILTER", "Unknown")),
            "EXPTIME": metadata.get("EXPTIME", header_data.get("EXPTIME", 0.0)),
            "DATE-OBS": metadata.get("DATE_OBS", header_data.get("DATE-OBS", "")),
            "RA": header_data.get("RA", 123.45),
            "DEC": header_data.get("DEC", 67.89),
            "AIRMASS": header_data.get("AIRMASS", 1.34),
            "PROPID": metadata.get("PROPID", header_data.get("PROPID", "Unknown")),
            "SITEID": metadata.get("SITEID", header_data.get("SITEID", "Unknown")),
            "TELID": metadata.get("TELID", header_data.get("TELID", "Unknown")),
            "OBSTYPE": metadata.get("OBSTYPE", header_data.get("OBSTYPE", "Unknown")),
            "REQNUM": metadata.get("REQNUM", header_data.get("REQNUM", 1)),
            "BLKUID": metadata.get("BLKUID", header_data.get("BLKUID", 1)),
            "RLEVEL": metadata.get("RLEVEL", header_data.get("RLEVEL", 0)),
            "OBSERVER": metadata.get("OBSERVER", header_data.get("OBSERVER", "Unknown")),
            "DAY_OBS": metadata.get("DAY_OBS", header_data.get("DAY_OBS", "")),
            "L1PUBDAT": metadata.get("L1PUBDAT", header_data.get("L1PUBDAT", ""))
        }
        
        try:
            with fits.open(file_path, mode='update') as hdul:
                hdu = hdul[0]
                
                # Clear existing header
                hdu.header.clear()
                
                # Add all header values
                for key, value in header_update_data.items():
                    hdu.header[key] = value
                
                # Add EXTEND=T if file has extensions
                if len(hdul) > 1:
                    hdu.header["EXTEND"] = True
                
                # Add timestamp comment
                hdu.header.add_comment(f"Header updated on {datetime.datetime.now().isoformat()}")
                
            print(f"✓ Header updated successfully for {file_path}")
            return True
            
        except Exception as e:
            print(f"✗ Error updating header: {e}")
            return False
    
    def prepare_metadata_payload(self, file_path, metadata, header_data):
        """
        Prepare complete metadata payload for Science Archive
        """
        basename = metadata.get("basename", os.path.splitext(os.path.basename(file_path))[0])
        
        # Calculate area (placeholder - should be calculated from actual data)
        area = {
            "type": "Polygon",
            "coordinates": [[
                [123.40, 67.84],
                [123.50, 67.84],
                [123.50, 67.94],
                [123.40, 67.94],
                [123.40, 67.84]
            ]]
        }
        
        # Prepare headers with all metadata from both sources
        headers = {
            "SIMPLE": header_data.get("SIMPLE", True),
            "BITPIX": header_data.get("BITPIX", -32),
            "NAXIS": header_data.get("NAXIS", 2),
            "NAXIS1": header_data.get("NAXIS1", 1024),
            "NAXIS2": header_data.get("NAXIS2", 1024),
            "OBJECT": metadata.get("OBJECT", header_data.get("OBJECT", "Unknown")),
            "TELESCOP": header_data.get("TELESCOP", "1.2m"),
            "INSTRUME": metadata.get("INSTRUME", header_data.get("INSTRUME", "Unknown")),
            "FILTER": metadata.get("FILTER", header_data.get("FILTER", "Unknown")),
            "EXPTIME": metadata.get("EXPTIME", header_data.get("EXPTIME", 0.0)),
            "DATE-OBS": metadata.get("DATE_OBS", header_data.get("DATE-OBS", "")),
            "RA": header_data.get("RA", 123.45),
            "DEC": header_data.get("DEC", 67.89),
            "AIRMASS": header_data.get("AIRMASS", 1.34),
            "PROPID": metadata.get("PROPID", header_data.get("PROPID", "Unknown")),
            "SITEID": metadata.get("SITEID", header_data.get("SITEID", "Unknown")),
            "TELID": metadata.get("TELID", header_data.get("TELID", "Unknown")),
            "OBSTYPE": metadata.get("OBSTYPE", header_data.get("OBSTYPE", "Unknown")),
            "REQNUM": metadata.get("REQNUM", header_data.get("REQNUM", 1)),
            "BLKUID": metadata.get("BLKUID", header_data.get("BLKUID", 1)),
            "RLEVEL": metadata.get("RLEVEL", header_data.get("RLEVEL", 0)),
            "OBSERVER": metadata.get("OBSERVER", header_data.get("OBSERVER", "Unknown")),
            "DAY_OBS": metadata.get("DAY_OBS", header_data.get("DAY_OBS", "")),
            "L1PUBDAT": metadata.get("L1PUBDAT", header_data.get("L1PUBDAT", ""))
        }
        
        # Calculate MD5
        md5_hash = self.calculate_md5(file_path)
        
        payload = {
            "basename": basename,
            "DAY_OBS": metadata.get("DAY_OBS", header_data.get("DAY_OBS", "")),
            "DATE_OBS": metadata.get("DATE_OBS", header_data.get("DATE-OBS", "")),
            "PROPID": metadata.get("PROPID", header_data.get("PROPID", "Unknown")),
            "INSTRUME": metadata.get("INSTRUME", header_data.get("INSTRUME", "Unknown")),
            "OBJECT": metadata.get("OBJECT", header_data.get("OBJECT", "Unknown")),
            "RLEVEL": metadata.get("RLEVEL", header_data.get("RLEVEL", 0)),
            "SITEID": metadata.get("SITEID", header_data.get("SITEID", "Unknown")),
            "TELID": metadata.get("TELID", header_data.get("TELID", "Unknown")),
            "EXPTIME": metadata.get("EXPTIME", header_data.get("EXPTIME", 0.0)),
            "FILTER": metadata.get("FILTER", header_data.get("FILTER", "Unknown")),
            "L1PUBDAT": metadata.get("L1PUBDAT", header_data.get("L1PUBDAT", "")),
            "OBSTYPE": metadata.get("OBSTYPE", header_data.get("OBSTYPE", "Unknown")),
            "BLKUID": metadata.get("BLKUID", header_data.get("BLKUID", 1)),
            "REQNUM": metadata.get("REQNUM", header_data.get("REQNUM", 1)),
            "OBSERVER": metadata.get("OBSERVER", header_data.get("OBSERVER", "Unknown")),
            "area": area,
            "headers": headers,
            "version_set": [
                {
                    "md5": md5_hash,
                    "key": os.path.basename(file_path),
                    "extension": ".fits"
                }
            ],
            "related_frame_filenames": []
        }
        
        return payload
    
    def upload_to_minio(self, file_path):
        """
        Upload file to MinIO storage
        """
        try:
            file_name = os.path.basename(file_path)
            self.minio_client.fput_object(
                self.minio_bucket, 
                file_name, 
                file_path
            )
            print(f"✓ File uploaded to MinIO: {file_name}")
            return True
        except S3Error as e:
            print(f"✗ MinIO upload error: {e}")
            return False
    
    def upload_to_science_archive(self, metadata_payload):
        """
        Upload metadata to Science Archive
        """
        headers = {
            'Authorization': f'Token {self.science_archive_token}',
            'Content-Type': 'application/json'
        }
        
        try:
            response = requests.post(
                self.science_archive_url,
                headers=headers,
                data=json.dumps(metadata_payload)
            )
            
            if response.status_code == 201:
                print("✓ Metadata uploaded to Science Archive successfully")
                print("Response:", response.json())
                return True
            else:
                print(f"✗ Science Archive upload failed: {response.status_code}")
                print("Response:", response.text)
                return False
                
        except requests.exceptions.RequestException as e:
            print(f"✗ Science Archive connection error: {e}")
            return False
    
    def ingest_file(self, file_path, metadata, header_data):
        """
        Complete ingestion process: update header, upload to MinIO, upload metadata to Science Archive
        """
        print(f"\n🚀 Starting ingestion process for: {file_path}")
        print("=" * 60)
        
        # Step 1: Update FITS header
        print("\n📝 Step 1: Updating FITS header...")
        if not self.update_fits_header(file_path, metadata, header_data):
            print("✗ Header update failed, aborting ingestion")
            return False
        
        # Step 2: Upload to MinIO
        print("\n☁️  Step 2: Uploading to MinIO storage...")
        if not self.upload_to_minio(file_path):
            print("✗ MinIO upload failed, aborting ingestion")
            return False
        
        # Step 3: Prepare and upload metadata to Science Archive
        print("\n🗄️  Step 3: Uploading metadata to Science Archive...")
        metadata_payload = self.prepare_metadata_payload(file_path, metadata, header_data)
        if not self.upload_to_science_archive(metadata_payload):
            print("✗ Science Archive upload failed")
            return False
        
        print("\n✅ Ingestion completed successfully!")
        print("=" * 60)
        return True

def main():
    """
    Main function with sample usage
    """
    ingester = AstronomicalIngester()
    
    # Check if file path and metadata are provided as arguments
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
        
        if not os.path.exists(file_path):
            print(f"✗ File not found: {file_path}")
            return
        
        # Check if metadata JSON file is provided
        if len(sys.argv) > 2:
            metadata_file = sys.argv[2]
            try:
                with open(metadata_file, 'r') as f:
                    data = json.load(f)
                    metadata = data.get('metadata', {})
                    header_data = data.get('header_data', {})
            except Exception as e:
                print(f"✗ Error reading metadata file: {e}")
                return
        else:
            # Use default sample metadata if no file provided
            metadata = {
                "basename": "sample_image_20250616_145810",
                "DAY_OBS": "20250616",
                "DATE_OBS": "2025-06-16T14:58:10",
                "PROPID": "test-proposal",
                "INSTRUME": "test-instrument",
                "OBJECT": "Sample Target",
                "RLEVEL": 0,
                "SITEID": "TST",
                "TELID": "T01",
                "EXPTIME": 60.0,
                "FILTER": "V",
                "L1PUBDAT": "2025-07-01T00:00:00",
                "OBSTYPE": "EXPOSE",
                "BLKUID": 1,
                "REQNUM": 1,
                "OBSERVER": "Dr. Astronomer"
            }
            
            header_data = {
                "SIMPLE": True,
                "BITPIX": -32,
                "NAXIS": 2,
                "NAXIS1": 1024,
                "NAXIS2": 1024,
                "OBJECT": "Sample Target",
                "TELESCOP": "Sample Telescope",
                "INSTRUME": "test-instrument",
                "FILTER": "V",
                "EXPTIME": 60.0,
                "DATE-OBS": "2025-06-16T14:58:10",
                "RA": 123.45,
                "DEC": 67.89,
                "AIRMASS": 1.23,
                "PROPID": "test-proposal",
                "SITEID": "TST",
                "TELID": "T01",
                "OBSTYPE": "EXPOSE",
                "REQNUM": 1,
                "BLKUID": 1,
                "RLEVEL": 0,
                "OBSERVER": "Dr. Astronomer",
                "DAY_OBS": "20250616",
                "L1PUBDAT": "2025-07-01T00:00:00"
            }
        
        ingester.ingest_file(file_path, metadata, header_data)
    else:
        print("Usage: python ingester.py <fits_file_path> [metadata_json_file]")
        print("Example: python ingester.py sample_image.fits metadata.json")
        print("Example: python ingester.py sample_image.fits")

if __name__ == '__main__':
    main() 