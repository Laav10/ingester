
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Database } from "lucide-react";

interface FormData {
  basename: string;
  DAY_OBS: string;
  DATE_OBS: string;
  PROPID: string;
  INSTRUME: string;
  OBJECT: string;
  RLEVEL: number;
  SITEID: string;
  TELID: string;
  EXPTIME: number;
  FILTER: string;
  L1PUBDAT: string;
  OBSTYPE: string;
  BLKUID: number;
  REQNUM: number;
}

interface MetadataCardProps {
  formData: FormData;
  onInputChange: (field: string, value: any) => void;
}

const MetadataCard = ({ formData, onInputChange }: MetadataCardProps) => {
  return (
    <Card className="bg-slate-900/40 backdrop-blur-xl border border-blue-400/30 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500">
      <CardHeader className="bg-gradient-to-r from-slate-800/60 via-blue-900/30 to-slate-800/60 border-b border-blue-400/30 backdrop-blur-sm">
        <CardTitle className="text-cyan-200 flex items-center gap-3 text-xl">
          <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/40">
            <Database className="w-5 h-5 text-blue-300" />
          </div>
          Observation Metadata
        </CardTitle>
        <CardDescription className="text-blue-200/80">
          Configure observation parameters and metadata for cosmic data processing
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="basename" className="text-cyan-300 font-medium">Basename</Label>
            <Input
              id="basename"
              value={formData.basename}
              onChange={(e) => onInputChange('basename', e.target.value)}
              className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="day_obs" className="text-cyan-300 font-medium">Day OBS</Label>
            <Input
              id="day_obs"
              value={formData.DAY_OBS}
              onChange={(e) => onInputChange('DAY_OBS', e.target.value)}
              className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date_obs" className="text-cyan-300 font-medium">Date OBS</Label>
            <Input
              id="date_obs"
              type="datetime-local"
              value={formData.DATE_OBS}
              onChange={(e) => onInputChange('DATE_OBS', e.target.value)}
              className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="propid" className="text-cyan-300 font-medium">Proposal ID</Label>
            <Input
              id="propid"
              value={formData.PROPID}
              onChange={(e) => onInputChange('PROPID', e.target.value)}
              className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instrume" className="text-cyan-300 font-medium">Instrument</Label>
            <Input
              id="instrume"
              value={formData.INSTRUME}
              onChange={(e) => onInputChange('INSTRUME', e.target.value)}
              className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="object" className="text-cyan-300 font-medium">Object</Label>
            <Input
              id="object"
              value={formData.OBJECT}
              onChange={(e) => onInputChange('OBJECT', e.target.value)}
              className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteid" className="text-cyan-300 font-medium">Site ID</Label>
            <Input
              id="siteid"
              value={formData.SITEID}
              onChange={(e) => onInputChange('SITEID', e.target.value)}
              className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telid" className="text-cyan-300 font-medium">Telescope ID</Label>
            <Input
              id="telid"
              value={formData.TELID}
              onChange={(e) => onInputChange('TELID', e.target.value)}
              className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="exptime" className="text-cyan-300 font-medium">Exposure Time</Label>
            <Input
              id="exptime"
              type="number"
              step="0.1"
              value={formData.EXPTIME}
              onChange={(e) => onInputChange('EXPTIME', parseFloat(e.target.value))}
              className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="filter" className="text-cyan-300 font-medium">Filter</Label>
            <Input
              id="filter"
              value={formData.FILTER}
              onChange={(e) => onInputChange('FILTER', e.target.value)}
              className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="obstype" className="text-cyan-300 font-medium">Observation Type</Label>
            <Input
              id="obstype"
              value={formData.OBSTYPE}
              onChange={(e) => onInputChange('OBSTYPE', e.target.value)}
              className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rlevel" className="text-cyan-300 font-medium">R Level</Label>
            <Input
              id="rlevel"
              type="number"
              value={formData.RLEVEL}
              onChange={(e) => onInputChange('RLEVEL', parseInt(e.target.value))}
              className="bg-slate-800/60 border-blue-400/40 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/70 focus:ring-cyan-400/30 backdrop-blur-sm"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetadataCard;
