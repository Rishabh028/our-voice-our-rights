import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

import Button from '../../../components/ui/Button';

const PerformanceChart = ({ title, data, type = 'bar', height = 300, showControls = true }) => {
  const [chartType, setChartType] = useState(type);
  const [timeRange, setTimeRange] = useState('6months');

  const colors = ['#1e3a8a', '#f97316', '#16a34a', '#dc2626', '#7c3aed', '#0891b2'];

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#6b7280" 
              fontSize={12}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(30, 58, 138, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#1e3a8a" 
              strokeWidth={3}
              dot={{ fill: '#1e3a8a', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#f97316' }}
            />
          </LineChart>
        );
      
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors?.[index % colors?.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
          </PieChart>
        );
      
      default:
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#6b7280" 
              fontSize={12}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(30, 58, 138, 0.1)'
              }}
            />
            <Bar 
              dataKey="value" 
              fill="#1e3a8a" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );
    }
  };

  return (
    <div className="civic-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        
        {showControls && (
          <div className="flex items-center space-x-2">
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={chartType === 'bar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setChartType('bar')}
                iconName="BarChart3"
                iconSize={16}
                className="px-3 py-1"
              />
              <Button
                variant={chartType === 'line' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setChartType('line')}
                iconName="TrendingUp"
                iconSize={16}
                className="px-3 py-1"
              />
              <Button
                variant={chartType === 'pie' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setChartType('pie')}
                iconName="PieChart"
                iconSize={16}
                className="px-3 py-1"
              />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconSize={16}
              className="px-3"
            >
              Export
            </Button>
          </div>
        )}
      </div>
      <div className="w-full" style={{ height: `${height}px` }} aria-label={`${title} Chart`}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
      {chartType === 'pie' && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data?.map((entry, index) => (
            <div key={entry?.name} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: colors?.[index % colors?.length] }}
              />
              <span className="text-sm text-text-secondary">{entry?.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PerformanceChart;