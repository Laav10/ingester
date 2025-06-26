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
  MODE: string;
  BLKUID: number;
  REQNUM: number;
  OBSERVER: string;
}

interface MetadataCardProps {
  formData: FormData;
  onInputChange: (field: string, value: any) => void;
}

const MetadataCard = ({ formData, onInputChange }: MetadataCardProps) => {
  return (
    <Card className="backdrop-blur-xl border shadow-2xl transition-all duration-500"
          style={{
            backgroundColor: 'rgba(20, 20, 30, 0.4)',
            borderColor: 'rgba(78, 113, 255, 0.3)',
            boxShadow: '0 25px 50px -12px rgba(78, 113, 255, 0.1)'
          }}>
      <CardHeader className="border-b backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(to right, rgba(20, 20, 30, 0.6), rgba(78, 113, 255, 0.3), rgba(20, 20, 30, 0.6))',
                    borderColor: 'rgba(78, 113, 255, 0.3)'
                  }}>
        <CardTitle className="flex items-center gap-3 text-xl" style={{color: '#8DD8FF'}}>
          <div className="p-2 rounded-lg border" 
               style={{backgroundColor: 'rgba(78, 113, 255, 0.2)', borderColor: 'rgba(78, 113, 255, 0.4)'}}>
            <Database className="w-5 h-5" style={{color: '#4E71FF'}} />
          </div>
          Observation Metadata
        </CardTitle>
        <CardDescription style={{color: 'rgba(187, 251, 255, 0.8)'}}>
          Configure observation parameters and metadata for cosmic data processing
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key} className="font-medium" style={{color: '#8DD8FF'}}>
                {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Label>
              <Input
                id={key}
                type={typeof value === 'number' ? 'number' : key.includes('DATE') ? 'datetime-local' : 'text'}
                value={value}
                onChange={(e) => onInputChange(key, typeof value === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)}
                className="backdrop-blur-sm transition-all"
                style={{
                  backgroundColor: 'rgba(20, 20, 30, 0.6)',
                  borderColor: 'rgba(78, 113, 255, 0.4)',
                  color: '#BBFBFF'
                }}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetadataCard;
