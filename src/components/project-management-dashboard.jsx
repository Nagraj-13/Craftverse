import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon, CheckCircle2, Circle, HelpCircle } from 'lucide-react'

const stages = [
  { id: 'prototype', name: 'Prototype' },
  { id: 'techStack', name: 'Tech Stack' },
  { id: 'process', name: 'Process' },
  { id: 'taskDistribution', name: 'Task Distribution' },
  { id: 'deadline', name: 'Deadline' },
]

const statusOptions = [
  { value: 'notStarted', label: 'Not Started', icon: Circle },
  { value: 'inProgress', label: 'In Progress', icon: HelpCircle },
  { value: 'completed', label: 'Completed', icon: CheckCircle2 },
]

const taskSchema = z.object({
  title: z.string().min(2, { message: "Task title must be at least 2 characters." }),
  description: z.string().min(10, { message: "Task description must be at least 10 characters." }),
  assignee: z.string().min(2, { message: "Assignee name must be at least 2 characters." }),
  dueDate: z.date({
    required_error: "Please select a due date.",
  }),
})

const feedbackSchema = z.object({
  comment: z.string().min(2, { message: "Comment must be at least 2 characters." }),
})

export function ProjectManagementDashboardComponent() {
  const [activeTab, setActiveTab] = useState('projectStages')
  const [stageStatuses, setStageStatuses] = useState(Object.fromEntries(stages.map(stage => [stage.id, 'notStarted'])))
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [selectedStage, setSelectedStage] = useState(null)
  const [tasks, setTasks] = useState({})
  const [feedback, setFeedback] = useState([])

  const taskForm = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      assignee: '',
      dueDate: new Date(),
    },
  })

  const feedbackForm = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      comment: '',
    },
  })

  const handleStatusUpdate = (stageId, status) => {
    setStageStatuses(prev => ({ ...prev, [stageId]: status }))
    toast({
      title: "Status Updated",
      description: `${stages.find(s => s.id === stageId)?.name} status set to ${status}.`,
    })
  }

  const openTaskModal = (stageId) => {
    setSelectedStage(stageId)
    setIsTaskModalOpen(true)
  }

  const onTaskSubmit = (data) => {
    if (selectedStage) {
      setTasks(prev => ({
        ...prev,
        [selectedStage]: [...(prev[selectedStage] || []), data],
      }))
      setIsTaskModalOpen(false)
      taskForm.reset()
      toast({
        title: "Task Added",
        description: `New task "${data.title}" added to ${stages.find(s => s.id === selectedStage)?.name}.`,
      })
    }
  }

  const onFeedbackSubmit = (data) => {
    setFeedback(prev => [...prev, data])
    feedbackForm.reset()
    toast({
      title: "Feedback Submitted",
      description: "Your comment has been added to the feedback section.",
    })
  }

  return (
    (<div className="container mx-auto py-10">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="projectStages">Project Stages</TabsTrigger>
          <TabsTrigger value="marketInsights">Market Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="projectStages">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stages.map((stage) => (
              <Card key={stage.id}>
                <CardHeader>
                  <CardTitle>{stage.name}</CardTitle>
                  <CardDescription>
                    Status: {stageStatuses[stage.id]}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    {statusOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={stageStatuses[stage.id] === option.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleStatusUpdate(stage.id, option.value)}>
                        {option.icon && <option.icon className="mr-2 h-4 w-4" />}
                        {option.label}
                      </Button>
                    ))}
                  </div>
                  <Button className="mt-4 w-full" onClick={() => openTaskModal(stage.id)}>
                    Add Task
                  </Button>
                  {tasks[stage.id] && tasks[stage.id].length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Tasks:</h4>
                      <ul className="list-disc pl-5">
                        {tasks[stage.id].map((task, index) => (
                          <li key={index}>{task.title}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="marketInsights">
          <Card>
            <CardHeader>
              <CardTitle>Market Insights</CardTitle>
              <CardDescription>
                Analyze market trends and competitor data to inform your project strategy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Market insights content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task for the {stages.find(s => s.id === selectedStage)?.name} stage.
            </DialogDescription>
          </DialogHeader>
          <Form {...taskForm}>
            <form onSubmit={taskForm.handleSubmit(onTaskSubmit)} className="space-y-4">
              <FormField
                control={taskForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter task title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField
                control={taskForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the task" className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField
                control={taskForm.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignee</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter assignee name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField
                control={taskForm.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}>
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )} />
              <DialogFooter>
                <Button type="submit">Add Task</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Feedback Section</CardTitle>
          <CardDescription>Add comments and receive feedback from team members.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...feedbackForm}>
            <form
              onSubmit={feedbackForm.handleSubmit(onFeedbackSubmit)}
              className="space-y-4">
              <FormField
                control={feedbackForm.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add your feedback or comment here"
                        className="min-h-[100px]"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              <Button type="submit">Submit Feedback</Button>
            </form>
          </Form>
          {feedback.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Recent Feedback:</h4>
              <ul className="space-y-2">
                {feedback.map((item, index) => (
                  <li key={index} className="bg-muted p-2 rounded">
                    {item.comment}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>)
  );
}