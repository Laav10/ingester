
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
}

interface HeaderDataCardProps {
  headerData: HeaderData;
  onHeaderChange: (field: string, value: any) => void;
}

const HeaderDataCard = ({ headerData, onHeaderChange }: HeaderDataCardProps) => {
  return (
    <Card className="bg-slate-900/40 backdrop-blur-xl border border-cyan-400/30 shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-500">
      <CardHeader className="bg-gradient-to-r from-slate-800/60 via-cyan-900/30 to-slate-800/60 border-b border-cyan-400/30 backdrop-blur-sm">
        <CardTitle className="text-blue-200 flex items-center gap-3 text-xl">
          <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40">
            <Server className="w-5 h-5 text-cyan-300" />
          </div>
          FITS Header Data
        </CardTitle>
        <CardDescription className="text-cyan-200/80">
          Additional header information for astronomical data processing
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="telescop" className="text-blue-300 font-medium">Telescope</Label>
            <Input
              id="telescop"
              value={headerData.TELESCOP}
              onChange={(e) => onHeaderChange('TELESCOP', e.target.value)}
              className="bg-slate-800/60 border-cyan-400/40 text-blue-100 placeholder-blue-400/50 focus:border-blue-400/70 focus:ring-blue-400/30 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ra" className="text-blue-300 font-medium">RA</Label>
            <Input
              id="ra"
              type="number"
              step="0.01"
              value={headerData.RA}
              onChange={(e) => onHeaderChange('RA', parseFloat(e.target.value))}
              className="bg-slate-800/60 border-cyan-400/40 text-blue-100 placeholder-blue-400/50 focus:border-blue-400/70 focus:ring-blue-400/30 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dec" className="text-blue-300 font-medium">DEC</Label>
            <Input
              id="dec"
              type="number"
              step="0.01"
              value={headerData.DEC}
              onChange={(e) => onHeaderChange('DEC', parseFloat(e.target.value))}
              className="bg-slate-800/60 border-cyan-400/40 text-blue-100 placeholder-blue-400/50 focus:border-blue-400/70 focus:ring-blue-400/30 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="airmass" className="text-blue-300 font-medium">Airmass</Label>
            <Input
              id="airmass"
              type="number"
              step="0.01"
              value={headerData.AIRMASS}
              onChange={(e) => onHeaderChange('AIRMASS', parseFloat(e.target.value))}
              className="bg-slate-800/60 border-cyan-400/40 text-blue-100 placeholder-blue-400/50 focus:border-blue-400/70 focus:ring-blue-400/30 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="naxis1" className="text-blue-300 font-medium">NAXIS1</Label>
            <Input
              id="naxis1"
              type="number"
              value={headerData.NAXIS1}
              onChange={(e) => onHeaderChange('NAXIS1', parseInt(e.target.value))}
              className="bg-slate-800/60 border-cyan-400/40 text-blue-100 placeholder-blue-400/50 focus:border-blue-400/70 focus:ring-blue-400/30 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="naxis2" className="text-blue-300 font-medium">NAXIS2</Label>
            <Input
              id="naxis2"
              type="number"
              value={headerData.NAXIS2}
              onChange={(e) => onHeaderChange('NAXIS2', parseInt(e.target.value))}
              className="bg-slate-800/60 border-cyan-400/40 text-blue-100 placeholder-blue-400/50 focus:border-blue-400/70 focus:ring-blue-400/30 backdrop-blur-sm"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeaderDataCard;
