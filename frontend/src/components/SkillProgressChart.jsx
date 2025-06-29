import React, { useRef, useEffect } from 'react';

const SkillProgressChart = ({ data, title = "Skill Progress Over Time" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const width = canvas.width = 600;
    const height = canvas.height = 400;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Chart margins
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Data processing
    const dates = data.map(d => new Date(d.rating_date));
    const ratings = data.map(d => parseFloat(d.overall_average));
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);
    const minRating = Math.max(0, Math.min(...ratings) - 0.5);
    const maxRating = Math.min(10, Math.max(...ratings) + 0.5);
    
    // Helper functions
    const xScale = (date) => margin.left + ((date - minDate) / (maxDate - minDate)) * chartWidth;
    const yScale = (rating) => margin.top + chartHeight - ((rating - minRating) / (maxRating - minRating)) * chartHeight;
    
    // Draw background
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines (ratings)
    for (let i = 0; i <= 5; i++) {
      const rating = minRating + (maxRating - minRating) * (i / 5);
      const y = yScale(rating);
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(margin.left + chartWidth, y);
      ctx.stroke();
      
      // Y-axis labels
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(rating.toFixed(1), margin.left - 10, y + 4);
    }
    
    // Vertical grid lines (dates)
    const dateStep = Math.ceil(dates.length / 6);
    for (let i = 0; i < dates.length; i += dateStep) {
      const x = xScale(dates[i]);
      ctx.beginPath();
      ctx.moveTo(x, margin.top);
      ctx.lineTo(x, margin.top + chartHeight);
      ctx.stroke();
      
      // X-axis labels
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.save();
      ctx.translate(x, height - margin.bottom + 20);
      ctx.rotate(-Math.PI / 6);
      ctx.fillText(dates[i].toLocaleDateString(), 0, 0);
      ctx.restore();
    }
    
    // Draw axes
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, margin.top + chartHeight);
    ctx.stroke();
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top + chartHeight);
    ctx.lineTo(margin.left + chartWidth, margin.top + chartHeight);
    ctx.stroke();
    
    // Draw the line
    if (data.length > 1) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      data.forEach((point, index) => {
        const x = xScale(dates[index]);
        const y = yScale(ratings[index]);
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
    }
    
    // Draw data points
    data.forEach((point, index) => {
      const x = xScale(dates[index]);
      const y = yScale(ratings[index]);
      
      // Point circle
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
      
      // Point border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
    
    // Draw title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, 25);
    
    // Draw axis labels
    ctx.fillStyle = '#374151';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Date', width / 2, height - 10);
    
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Average Rating', 0, 0);
    ctx.restore();
    
  }, [data, title]);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
        <div className="text-center py-8 text-gray-500">
          No progress data available yet. Complete some skill assessments to see your progress!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      <div className="flex justify-center">
        <canvas 
          ref={canvasRef}
          className="border border-gray-200 rounded"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>This chart shows your overall skill rating progress over time.</p>
        <p>Each point represents the average of all skill ratings on that date.</p>
      </div>
    </div>
  );
};

export default SkillProgressChart;