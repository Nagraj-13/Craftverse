import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Cell } from 'recharts'
import { motion } from 'framer-motion'
import { Download, HelpCircle, TrendingUp, DollarSign, PieChart as PieChartIcon } from 'lucide-react';

// Simulated data for charts
const techDistributionData = [
  { name: 'React', value: 40 },
  { name: 'Vue', value: 30 },
  { name: 'Angular', value: 20 },
  { name: 'Svelte', value: 10 },
]

const revenueData = [
  { name: 'Q1', revenue: 1000 },
  { name: 'Q2', revenue: 1500 },
  { name: 'Q3', revenue: 2000 },
  { name: 'Q4', revenue: 2500 },
]

const growthData = [
  { name: '2020', growth: 10 },
  { name: '2021', growth: 15 },
  { name: '2022', growth: 25 },
  { name: '2023', growth: 35 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function MetricsInsightsDashboardComponent() {
  const [selectedRegion, setSelectedRegion] = useState('global')
  const [selectedAudienceSize, setSelectedAudienceSize] = useState('medium')
  const { toast } = useToast()

  const handleExportPDF = () => {
    // Simulated PDF export
    toast({
      title: "Exporting PDF",
      description: "Your report is being generated and will download shortly.",
    })
    // In a real application, you would generate and download the PDF here
  }

  return (
    (<TooltipProvider>
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-8">Metrics and Insights Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Market Potential
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Real-time data on market size and trends</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$2.5B</div>
              <p className="text-muted-foreground">Estimated market size</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Technology Distribution
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Distribution of technologies in the market</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={techDistributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label>
                      {techDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Revenue Potential
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Estimated revenue based on selected parameters</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Global</SelectItem>
                    <SelectItem value="na">North America</SelectItem>
                    <SelectItem value="eu">Europe</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={setSelectedAudienceSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (&lt;10k)</SelectItem>
                    <SelectItem value="medium">Medium (10k-100k)</SelectItem>
                    <SelectItem value="large">Large (&gt;100k)</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-3xl font-bold">$500K - $1.2M</div>
                <p className="text-muted-foreground">Estimated annual revenue</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Growth Potential
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Historical and projected growth trends</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="growth" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Analytics</CardTitle>
            <CardDescription>Comprehensive view of your project's metrics and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold mb-2">Revenue Projection</h3>
                <ChartContainer config={{}} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="revenue" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Market Share</h3>
                <ChartContainer config={{}} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={techDistributionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label>
                        {techDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleExportPDF}>
              <Download className="mr-2 h-4 w-4" />
              Export PDF Report
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Key Insights</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Market Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>The market shows a positive trend with a 15% YoY growth rate.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" />
                    Revenue Opportunity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Potential for $1M+ annual revenue with current market penetration.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChartIcon className="mr-2 h-5 w-5" />
                    Technology Adoption
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>React dominates the market with 40% share in frontend technologies.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </TooltipProvider>)
  );
}