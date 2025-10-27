import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const HistoricalTrends = ({ district }) => {
  const [selectedMetric, setSelectedMetric] = useState('employment-days');
  const [timeRange, setTimeRange] = useState('12-months');
  const [chartType, setChartType] = useState('line');

  const metricOptions = [
    { value: 'employment-days', label: 'Employment Days Generated' },
    { value: 'wage-payments', label: 'Wage Payments (₹ Crores)' },
    { value: 'job-cards', label: 'Job Cards Issued' },
    { value: 'works-completed', label: 'Works Completed' },
    { value: 'women-participation', label: 'Women Participation (%)' }
  ];

  const timeRangeOptions = [
    { value: '6-months', label: 'Last 6 Months' },
    { value: '12-months', label: 'Last 12 Months' },
    { value: '24-months', label: 'Last 24 Months' },
    { value: '5-years', label: 'Last 5 Years' }
  ];

  const employmentData = [
    { month: 'Nov 2024', value: 3.2, target: 3.8, previous: 2.9 },
    { month: 'Dec 2024', value: 3.5, target: 3.8, previous: 3.1 },
    { month: 'Jan 2025', value: 4.1, target: 4.2, previous: 3.4 },
    { month: 'Feb 2025', value: 4.3, target: 4.2, previous: 3.6 },
    { month: 'Mar 2025', value: 4.8, target: 4.5, previous: 3.9 },
    { month: 'Apr 2025', value: 5.2, target: 4.5, previous: 4.2 },
    { month: 'May 2025', value: 4.9, target: 4.8, previous: 4.1 },
    { month: 'Jun 2025', value: 4.6, target: 4.8, previous: 3.8 },
    { month: 'Jul 2025', value: 4.4, target: 4.5, previous: 3.7 },
    { month: 'Aug 2025', value: 4.7, target: 4.5, previous: 4.0 },
    { month: 'Sep 2025', value: 5.1, target: 4.8, previous: 4.3 },
    { month: 'Oct 2025', value: 5.3, target: 4.8, previous: 4.5 }
  ];

  const wageData = [
    { month: 'Nov 2024', value: 18.5, target: 20.0, previous: 16.2 },
    { month: 'Dec 2024', value: 19.2, target: 20.0, previous: 17.1 },
    { month: 'Jan 2025', value: 21.3, target: 22.0, previous: 18.4 },
    { month: 'Feb 2025', value: 22.1, target: 22.0, previous: 19.2 },
    { month: 'Mar 2025', value: 24.6, target: 23.0, previous: 20.8 },
    { month: 'Apr 2025', value: 25.8, target: 23.0, previous: 21.5 },
    { month: 'May 2025', value: 24.2, target: 24.0, previous: 20.9 },
    { month: 'Jun 2025', value: 23.1, target: 24.0, previous: 19.8 },
    { month: 'Jul 2025', value: 22.8, target: 23.5, previous: 19.5 },
    { month: 'Aug 2025', value: 24.3, target: 23.5, previous: 21.2 },
    { month: 'Sep 2025', value: 26.1, target: 24.5, previous: 22.4 },
    { month: 'Oct 2025', value: 27.2, target: 24.5, previous: 23.1 }
  ];

  const getCurrentData = () => {
    switch (selectedMetric) {
      case 'wage-payments':
        return wageData;
      default:
        return employmentData;
    }
  };

  const getMetricUnit = () => {
    switch (selectedMetric) {
      case 'employment-days':
        return 'Lakh Days';
      case 'wage-payments':
        return '₹ Crores';
      case 'job-cards':
        return 'Thousands';
      case 'works-completed':
        return 'Numbers';
      case 'women-participation':
        return 'Percentage';
      default:
        return 'Units';
    }
  };

  const calculateGrowth = (data) => {
    const latest = data?.[data?.length - 1]?.value || 0;
    const previous = data?.[data?.length - 2]?.value || 0;
    const growth = previous > 0 ? ((latest - previous) / previous * 100) : 0;
    return growth?.toFixed(1);
  };

  const calculateAverage = (data) => {
    const sum = data?.reduce((acc, item) => acc + item?.value, 0);
    return (sum / data?.length)?.toFixed(1);
  };

  const currentData = getCurrentData();
  const growth = calculateGrowth(currentData);
  const average = calculateAverage(currentData);

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-civic-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Historical Trends</h2>
          <p className="text-sm text-text-secondary mt-1">
            Performance trends for {district?.name || 'Selected District'}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Select
            options={metricOptions}
            value={selectedMetric}
            onChange={setSelectedMetric}
            className="w-48"
          />
          
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-40"
          />
          
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            <Button
              variant={chartType === 'line' ? 'default' : 'ghost'}
              size="sm"
              iconName="TrendingUp"
              iconSize={14}
              onClick={() => setChartType('line')}
              className="px-3 py-1"
            />
            <Button
              variant={chartType === 'bar' ? 'default' : 'ghost'}
              size="sm"
              iconName="BarChart3"
              iconSize={14}
              onClick={() => setChartType('bar')}
              className="px-3 py-1"
            />
          </div>
        </div>
      </div>
      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <Icon name="TrendingUp" size={20} className="text-blue-600" />
            <span className={`text-sm font-medium ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {growth >= 0 ? '+' : ''}{growth}%
            </span>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-blue-600">{currentData?.[currentData?.length - 1]?.value}</div>
            <div className="text-xs text-blue-700">Current Month ({getMetricUnit()})</div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <Icon name="Target" size={20} className="text-green-600" />
            <span className="text-sm font-medium text-green-600">Target</span>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-green-600">{currentData?.[currentData?.length - 1]?.target}</div>
            <div className="text-xs text-green-700">Monthly Target ({getMetricUnit()})</div>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <Icon name="BarChart" size={20} className="text-orange-600" />
            <span className="text-sm font-medium text-orange-600">Average</span>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-orange-600">{average}</div>
            <div className="text-xs text-orange-700">12-Month Average ({getMetricUnit()})</div>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <Icon name="Calendar" size={20} className="text-purple-600" />
            <span className="text-sm font-medium text-purple-600">YoY</span>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-purple-600">+18.7%</div>
            <div className="text-xs text-purple-700">Year over Year Growth</div>
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="h-80 w-full" aria-label={`${selectedMetric} trend chart`}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => value?.split(' ')?.[0]}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => `${value} ${getMetricUnit()?.split(' ')?.[0]}`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value, name) => [`${value} ${getMetricUnit()}`, name]}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#1e3a8a" 
                strokeWidth={3}
                dot={{ fill: '#1e3a8a', strokeWidth: 2, r: 4 }}
                name="Actual"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#16a34a" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#16a34a', strokeWidth: 2, r: 3 }}
                name="Target"
              />
              <Line 
                type="monotone" 
                dataKey="previous" 
                stroke="#6b7280" 
                strokeWidth={2}
                dot={{ fill: '#6b7280', strokeWidth: 1, r: 2 }}
                name="Previous Year"
              />
            </LineChart>
          ) : (
            <BarChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => value?.split(' ')?.[0]}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => `${value} ${getMetricUnit()?.split(' ')?.[0]}`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value, name) => [`${value} ${getMetricUnit()}`, name]}
              />
              <Legend />
              <Bar dataKey="value" fill="#1e3a8a" name="Actual" />
              <Bar dataKey="target" fill="#16a34a" name="Target" />
              <Bar dataKey="previous" fill="#6b7280" name="Previous Year" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Insights */}
      <div className="mt-6 pt-4 border-t border-border">
        <h3 className="font-medium text-foreground mb-3">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
            <Icon name="TrendingUp" size={16} className="text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800">Positive Trend</p>
              <p className="text-xs text-green-700">Performance has improved by {growth}% compared to last month</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
            <Icon name="Target" size={16} className="text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800">Target Achievement</p>
              <p className="text-xs text-blue-700">Currently at {((currentData?.[currentData?.length - 1]?.value / currentData?.[currentData?.length - 1]?.target) * 100)?.toFixed(1)}% of monthly target</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalTrends;