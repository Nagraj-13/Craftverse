import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, RefreshCw } from 'lucide-react'
// import Link from 'next/link'
import {Link} from 'react-router-dom'
// Mock function to simulate AI-generated content
const generateDescription = async (section) => {
  await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call
  const descriptions = {
    overview: "Your innovative project aims to revolutionize urban transportation through a network of autonomous electric vehicles. By combining cutting-edge AI technology with sustainable energy solutions, this initiative promises to reduce traffic congestion, lower carbon emissions, and improve overall urban mobility.",
    problem: "Urban areas worldwide face increasing challenges with traffic congestion, air pollution, and inefficient transportation systems. Traditional solutions have failed to keep pace with rapid urbanization, resulting in economic losses, decreased quality of life, and significant environmental impact.",
    solution: "Our project introduces a fleet of AI-driven electric vehicles that communicate in real-time, optimizing routes and reducing idle time. The system integrates with existing public transportation, creating a seamless, efficient, and environmentally friendly urban mobility network. Users can easily request rides through a mobile app, which uses predictive algorithms to minimize wait times and maximize vehicle occupancy.",
    impact: "By implementing this solution, cities can expect a 30% reduction in traffic congestion, a 40% decrease in transportation-related carbon emissions, and a 25% improvement in average commute times. Additionally, the project will create new job opportunities in technology and sustainable transportation sectors, contributing to economic growth and urban development.",
  }
  return descriptions[section];
}

export function ProjectPage() {
  const [descriptions, setDescriptions] = useState({
    overview: '',
    problem: '',
    solution: '',
    impact: ''
  })
  const [isGenerating, setIsGenerating] = useState({
    overview: false,
    problem: false,
    solution: false,
    impact: false
  })

  const handleGenerate = async (section) => {
    setIsGenerating(prev => ({ ...prev, [section]: true }))
    const generatedText = await generateDescription(section)
    setDescriptions(prev => ({ ...prev, [section]: generatedText }))
    setIsGenerating(prev => ({ ...prev, [section]: false }))
  }

  const handleEdit = (section, value) => {
    setDescriptions(prev => ({ ...prev, [section]: value }))
  }

  return (
    (<div className="min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Generate Your Project Description</CardTitle>
          <CardDescription>Craft a compelling project description with AI assistance. Edit and refine as needed.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="problem">Problem</TabsTrigger>
              <TabsTrigger value="solution">Solution</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
            </TabsList>
            {(Object.keys(descriptions)).map((section) => (
              <TabsContent key={section} value={section} className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="capitalize">{section}</CardTitle>
                    <CardDescription>
                      {section === 'overview' ? 'Provide a brief summary of your project.' :
                       section === 'problem' ? 'Describe the problem your project addresses.' :
                       section === 'solution' ? 'Explain your proposed solution.' :
                       'Outline the potential impact of your project.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${section}-description`}>Description</Label>
                      <Textarea
                        id={`${section}-description`}
                        value={descriptions[section]}
                        onChange={(e) => handleEdit(section, e.target.value)}
                        placeholder={`Enter your project's ${section} here...`}
                        className="min-h-[200px]" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => handleGenerate(section)} disabled={isGenerating[section]}>
                      {isGenerating[section] ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Regenerate
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/domain-exploration">Back to Domains</Link>
          </Button>
          <Button asChild>
            <Link href="/project-dashboard">Proceed to Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>)
  );
}