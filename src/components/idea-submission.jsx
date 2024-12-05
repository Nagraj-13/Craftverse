import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"
import { toast } from '@/hooks/use-toast'
import { Loader2, MessageCircle, X } from 'lucide-react'

const ideaSchema = z.object({
  title: z.string().min(2, { message: "Idea title must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  impact: z.string().min(10, { message: "Impact description must be at least 10 characters." }),
})

const defaultValues = {
  title: "",
  description: "",
  impact: "",
}

export function IdeaSubmission() {
  const [isAssessing, setIsAssessing] = useState(false)
  const [assessmentResult, setAssessmentResult] = useState(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([])

  const form = useForm({
    resolver: zodResolver(ideaSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data) {
    setIsAssessing(true)
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsAssessing(false)
    
    // Simulate AI assessment result
    const result = {
      novelty: Math.random() * 100,
      marketRelevance: Math.random() * 100,
      feasibility: Math.random() * 100,
      isExisting: Math.random() > 0.7, // 30% chance of being considered an existing idea
    }
    setAssessmentResult(result)

    toast({
      title: "Idea submitted successfully",
      description: "Your idea has been submitted and assessed by our AI.",
    })
  }

  const handleChatSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const message = formData.get('chatMessage')
    if (message.trim()) {
      setChatMessages(prev => [...prev, { role: 'user', content: message }])
      // Simulate AI response
      setTimeout(() => {
        setChatMessages(
          prev => [...prev, { role: 'assistant', content: `Thank you for your message: "${message}". How can I assist you further with your idea?` }]
        )
      }, 1000)
      e.currentTarget.reset()
    }
  }

  return (
    (<div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Submit Your Idea</CardTitle>
          <CardDescription>Share your innovative idea and get AI-powered feedback.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idea Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the title of your idea" {...field} />
                    </FormControl>
                    <FormDescription>A catchy title for your innovative idea.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idea Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your idea in detail"
                        className="min-h-[100px]"
                        {...field} />
                    </FormControl>
                    <FormDescription>Provide a comprehensive description of your idea.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField
                control={form.control}
                name="impact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intended Impact</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the intended impact of your idea"
                        className="min-h-[100px]"
                        {...field} />
                    </FormControl>
                    <FormDescription>Explain how your idea will make a difference.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />
              <Button type="submit" disabled={isAssessing}>
                {isAssessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Assessing
                  </>
                ) : 'Submit Idea'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {assessmentResult && (
        <Card className="w-full max-w-2xl mx-auto mt-8">
          <CardHeader>
            <CardTitle>AI Assessment Result</CardTitle>
            <CardDescription>Here's what our AI thinks about your idea.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Novelty</Label>
              <Progress value={assessmentResult.novelty} className="mt-2" />
            </div>
            <div>
              <Label>Market Relevance</Label>
              <Progress value={assessmentResult.marketRelevance} className="mt-2" />
            </div>
            <div>
              <Label>Feasibility</Label>
              <Progress value={assessmentResult.feasibility} className="mt-2" />
            </div>
            {assessmentResult.isExisting && (
              <div
                className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
                role="alert">
                <p className="font-bold">Similar Ideas Detected</p>
                <p>Our AI has detected similar existing ideas. Would you like to provide more information or clarify how your idea is unique?</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      <div className="fixed bottom-4 right-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12"
          onClick={() => setIsChatOpen(prev => !prev)}>
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
      {isChatOpen && (
        <Card className="fixed bottom-20 right-4 w-80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chat Assistance</CardTitle>
            <X className="h-4 w-4 cursor-pointer" onClick={() => setIsChatOpen(false)} />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`rounded-lg p-2 max-w-[80%] ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} className="mt-4 flex gap-2">
              <Input name="chatMessage" placeholder="Type your message..." />
              <Button type="submit" size="sm">Send</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>)
  );
}