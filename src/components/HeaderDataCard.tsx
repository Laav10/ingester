import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Server } from "lucide-react";

interface HeaderData {
  SIMPLE: boolean;
  BITPIX: number;
  NAXIS: number;
  NAXIS1: number;
  NAXIS2: number;
  OBJECT: string;
  TELESCOP: string;
  INSTRUME: string;
  FILTER: string;
  EXPTIME: number;
  "DATE-OBS": string;
  RA: number;
  DEC: number;
  AIRMASS: number;
  PROPID: string;
  SITEID: string;
  TELID: string;
  OBSTYPE: string;
  REQNUM: number;
  BLKUID: number;
  RLEVEL: number;
  OBSERVER: string;
  DAY_OBS: string;
  L1PUBDAT: string;
}

interface HeaderDataCardProps {
  headerData: HeaderData;
  onHeaderChange: (field: string, value: any) => void;
}

const HeaderDataCard = ({ headerData, onHeaderChange }: HeaderDataCardProps) => {
  // Display all header fields for comprehensive editing
  const displayFields = [
    'TELESCOP', 'RA', 'DEC', 'AIRMASS', 'NAXIS1', 'NAXIS2', 
    'OBJECT', 'INSTRUME', 'FILTER', 'EXPTIME', 'DATE-OBS',
    'PROPID', 'SITEID', 'TELID', 'OBSTYPE', 'REQNUM', 'BLKUID', 
    'RLEVEL', 'OBSERVER', 'DAY_OBS', 'L1PUBDAT'
  ];
  
  return (
    <Card className="backdrop-blur-xl border shadow-2xl transition-all duration-500"
          style={{
            backgroundColor: 'rgba(20, 20, 30, 0.4)',
            borderColor: 'rgba(141, 216, 255, 0.3)',
            boxShadow: '0 25px 50px -12px rgba(141, 216, 255, 0.1)'
          }}>
      <CardHeader className="border-b backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(to right, rgba(20, 20, 30, 0.6), rgba(141, 216, 255, 0.3), rgba(20, 20, 30, 0.6))',
                    borderColor: 'rgba(141, 216, 255, 0.3)'
                  }}>
        <CardTitle className="flex items-center gap-3 text-xl" style={{color: '#4E71FF'}}>
          <div className="p-2 rounded-lg border" 
               style={{backgroundColor: 'rgba(141, 216, 255, 0.2)', borderColor: 'rgba(141, 216, 255, 0.4)'}}>
            <Server className="w-5 h-5" style={{color: '#8DD8FF'}} />
          </div>
          FITS Header Data
        </CardTitle>
        <CardDescription style={{color: 'rgba(141, 216, 255, 0.8)'}}>
          Complete header information for astronomical data processing
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayFields.map((field) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field} className="font-medium" style={{color: '#4E71FF'}}>
                {field}
              </Label>
              <Input
                id={field}
                type={typeof headerData[field as keyof HeaderData] === 'number' ? 'number' : 
                      field.includes('DATE') ? 'datetime-local' : 'text'}
                step={field === 'RA' || field === 'DEC' || field === 'AIRMASS' ? '0.01' : undefined}
                value={String(headerData[field as keyof HeaderData])}
                onChange={(e) => onHeaderChange(field, typeof headerData[field as keyof HeaderData] === 'number' ? parseFloat(e.target.value) : e.target.value)}
                className="backdrop-blur-sm transition-all"
                style={{
                  backgroundColor: 'rgba(20, 20, 30, 0.6)',
                  borderColor: 'rgba(141, 216, 255, 0.4)',
                  color: '#4E71FF'
                }}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HeaderDataCard;
