import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { NavigationComponent } from '../../../../shared/components/navigation/navigation';
import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../../../core/models';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, NavigationComponent],
  templateUrl: './overview.html',
  styleUrls: ['./overview.css']
})
export class OverviewComponent implements OnInit, AfterViewInit, OnDestroy {
  private charts: Chart[] = [];
  private intervalId: any;

  campaigns: Campaign[] = [];
  campaignData = {
    totalCampaigns: 0,
    totalLeads: 0,
    openRate: 0,
    conversionRate: 0
  };

  constructor(private campaignService: CampaignService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.loadCampaignData();
    this.startRealTimeUpdates();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.campaigns.length > 0) {
        this.createCharts();
      }
    }, 1000);
  }

  ngOnDestroy() {
    // Clean up charts and intervals
    this.charts.forEach(chart => chart.destroy());
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private createCharts() {
    this.createCampaignPerformanceChart();
    this.createLeadSegmentChart();
    // this.createEngagementTrendChart();
  }

  private createCampaignPerformanceChart() {
    const ctx = document.getElementById('campaignChart') as HTMLCanvasElement;
    if (!ctx) return;

    const labels = this.campaigns.map(campaign => campaign.name);
    const openRates = this.campaigns.map(campaign => campaign.openRate || 0);
    const conversionRates = this.campaigns.map(campaign => campaign.conversionRate || 0);
const config: ChartConfiguration = {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Open Rate (%)',
      data: openRates,
      backgroundColor: '#4f46e5',
      borderRadius: 4,
      borderColor: '#ffffff'
    }, {
      label: 'Conversion Rate (%)',
      data: conversionRates,
      backgroundColor: '#06b6d4',
      borderRadius: 4
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Campaign Performance',
        color: '#ffffff'  // White title text color
      },
      legend: {
        labels: {
          color: '#ffffff'  // White text color for legend labels
        }
      },
      tooltip: {
        titleColor: '#ffffff',  // White tooltip title color
        bodyColor: '#ffffff',   // White tooltip body text color
        backgroundColor: '#333333',  // Optional: Dark background color for tooltips for contrast
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff',  // White text color for X-axis labels
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#ffffff',  // White text color for Y-axis labels
        }
      }
    }
  }
};


    this.charts.push(new Chart(ctx, config));
  }

  private createLeadSegmentChart() {
    const ctx = document.getElementById('segmentChart') as HTMLCanvasElement;
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: ['Corporate', 'General Public', 'Students', 'Early Adopters'],
        datasets: [{
          data: [35, 40, 15, 10],
          backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#8b5cf6'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Lead Segments Distribution'
          }
        }
      }
    };

    this.charts.push(new Chart(ctx, config));
  }

  

  private loadCampaignData() {
    this.campaignService.getCampaigns().subscribe({
      next: (campaigns) => {
        this.campaignService.getLeads().subscribe({
          next: (leads) => {
            campaigns.forEach(campaign => {
              const campaignLeads = leads.filter(lead => lead.campaignId === campaign.name);
              campaign.totalLeads = campaignLeads.length;
            });
            this.campaigns = campaigns;
            this.updateCampaignData();
            // Recreate charts with new data
            if (this.charts.length > 0) {
              this.updateCharts();
            }
          },
          error: () => {
            this.campaigns = campaigns;
            this.updateCampaignData();
          }
        });
      }
    });
  }

  private updateCampaignData() {
    this.campaignData.totalCampaigns = this.campaigns.length;
    this.campaignData.totalLeads = this.campaigns.reduce((total, campaign) => total + (campaign.totalLeads || 0), 0);
    this.campaignData.openRate = this.getAvgOpenRate();
    this.campaignData.conversionRate = this.getAvgConversionRate();
    this.updateCharts();
  }

  private getAvgOpenRate(): number {
    const validCampaigns = this.campaigns.filter(c => c.openRate !== undefined);
    if (validCampaigns.length === 0) return 0;
    const total = validCampaigns.reduce((sum, c) => sum + (c.openRate || 0), 0);
    return Math.round(total / validCampaigns.length * 10) / 10;
  }

  private getAvgConversionRate(): number {
    const validCampaigns = this.campaigns.filter(c => c.conversionRate !== undefined);
    if (validCampaigns.length === 0) return 0;
    const total = validCampaigns.reduce((sum, c) => sum + (c.conversionRate || 0), 0);
    return Math.round(total / validCampaigns.length * 10) / 10;
  }

  private updateCharts() {
    this.charts.forEach(chart => chart.destroy());
    this.charts = [];
    setTimeout(() => {
      this.createCharts();
    }, 100);
  }

  private startRealTimeUpdates() {
    this.intervalId = setInterval(() => {
      this.loadCampaignData();
    }, 3000); // Reduced to 3 seconds
  }

  refreshData() {
    this.loadCampaignData();
  }
}