import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for domains and problem statements
const domains = [
  "Healthcare", "Education", "Environment", "Finance", "Technology", 
  "Agriculture", "Energy", "Transportation", "Social Impact"
]

const problemStatements = [
  { id: 1, domain: "Healthcare", statement: "How can we improve early detection of chronic diseases in rural areas?", votes: 120 },
  { id: 2, domain: "Education", statement: "What innovative methods can enhance remote learning experiences for K-12 students?", votes: 95 },
  { id: 3, domain: "Environment", statement: "How can we reduce plastic waste in urban areas through community-driven initiatives?", votes: 150 },
  { id: 4, domain: "Finance", statement: "How can we make financial literacy more accessible to underserved communities?", votes: 80 },
  { id: 5, domain: "Technology", statement: "What solutions can bridge the digital divide in developing countries?", votes: 110 },
  { id: 6, domain: "Agriculture", statement: "How can small-scale farmers leverage technology to improve crop yields sustainably?", votes: 75 },
  { id: 7, domain: "Energy", statement: "What innovative approaches can accelerate the adoption of renewable energy in residential areas?", votes: 130 },
  { id: 8, domain: "Transportation", statement: "How can we reduce traffic congestion in major cities using smart technology?", votes: 100 },
  { id: 9, domain: "Social Impact", statement: "What strategies can effectively address homelessness in urban centers?", votes: 140 },
  { id: 10, domain: "Healthcare", statement: "How can telemedicine be optimized to provide quality healthcare in remote regions?", votes: 90 },
]

export function Page() {
  const [selectedDomain, setSelectedDomain] = useState(undefined)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProblems = problemStatements.filter(problem => 
    (selectedDomain ? problem.domain === selectedDomain : true) &&
    problem.statement.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    (<div className="min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Explore Domains & Problem Statements</CardTitle>
          <CardDescription>Discover challenges across various domains and find inspiration for your next project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select onValueChange={(value) => setSelectedDomain(value)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select Domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={undefined}>All Domains</SelectItem>
                  {domains.map((domain) => (
                    <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Search problem statements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full" />
            </div>
            <ScrollArea className="h-[500px] w-full rounded-md border p-4">
              {filteredProblems.map((problem) => (
                <Card key={problem.id} className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{problem.domain}</Badge>
                      <span className="text-sm text-gray-500">Votes: {problem.votes}</span>
                    </div>
                    <p className="text-sm">{problem.statement}</p>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">Explore This Problem</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>)
  );
}