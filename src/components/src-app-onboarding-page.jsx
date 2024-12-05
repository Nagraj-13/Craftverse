import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function Page() {
  const [step, setStep] = useState(1)
  const [teamInfo, setTeamInfo] = useState({
    teamName: '',
    coreSkills: '',
    leaderName: '',
    mentorName: '',
    additionalInfo: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTeamInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4))
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1))

  const renderStep = () => {
    switch(step) {
      case 1:
        return (<>
          <CardHeader>
            <CardTitle>Team Information</CardTitle>
            <CardDescription>Let's start with your team name and core skills.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                name="teamName"
                value={teamInfo.teamName}
                onChange={handleInputChange}
                placeholder="Enter your team name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coreSkills">Core Skills</Label>
              <Textarea
                id="coreSkills"
                name="coreSkills"
                value={teamInfo.coreSkills}
                onChange={handleInputChange}
                placeholder="List your team's core skills" />
            </div>
          </CardContent>
        </>);
      case 2:
        return (<>
          <CardHeader>
            <CardTitle>Leadership</CardTitle>
            <CardDescription>Who leads and mentors your team?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="leaderName">Team Leader</Label>
              <Input
                id="leaderName"
                name="leaderName"
                value={teamInfo.leaderName}
                onChange={handleInputChange}
                placeholder="Enter team leader's name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mentorName">Team Mentor</Label>
              <Input
                id="mentorName"
                name="mentorName"
                value={teamInfo.mentorName}
                onChange={handleInputChange}
                placeholder="Enter team mentor's name" />
            </div>
          </CardContent>
        </>);
      case 3:
        return (<>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>Anything else you'd like to share about your team?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Info</Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                value={teamInfo.additionalInfo}
                onChange={handleInputChange}
                placeholder="Any additional information about your team" />
            </div>
          </CardContent>
        </>);
      case 4:
        return (<>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Here's what you've shared about your team.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Team Name</h3>
              <p>{teamInfo.teamName}</p>
            </div>
            <div>
              <h3 className="font-semibold">Core Skills</h3>
              <p>{teamInfo.coreSkills}</p>
            </div>
            <div>
              <h3 className="font-semibold">Team Leader</h3>
              <p>{teamInfo.leaderName}</p>
            </div>
            <div>
              <h3 className="font-semibold">Team Mentor</h3>
              <p>{teamInfo.mentorName}</p>
            </div>
            <div>
              <h3 className="font-semibold">Additional Information</h3>
              <p>{teamInfo.additionalInfo}</p>
            </div>
          </CardContent>
        </>);
    }
  }

  return (
    (<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <div className="p-4">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`w-1/4 h-2 rounded-full ${num <= step ? 'bg-primary' : 'bg-gray-200'}`}
                aria-hidden="true" />
            ))}
          </div>
          {renderStep()}
        </div>
        <CardFooter className="flex justify-between">
          <Button onClick={handlePrev} disabled={step === 1} variant="outline">
            Previous
          </Button>
          <Button onClick={handleNext} disabled={step === 4}>
            {step === 3 ? 'Finish' : 'Next'}
          </Button>
        </CardFooter>
      </Card>
    </div>)
  );
}