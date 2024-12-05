import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { toast } from '@/hooks/use-toast'


const teamSchema = z.object({
  teamName: z.string().min(2, { message: "Team name must be at least 2 characters." }),
  coreSkill: z.string().min(2, { message: "Core skill must be at least 2 characters." }),
  teamLeader: z.string().min(2, { message: "Team leader name is required." }),
  mentor: z.string().optional(),
  members: z.array(z.object({
    name: z.string().min(2, { message: "Member name must be at least 2 characters." }),
    role: z.string().min(2, { message: "Member role must be at least 2 characters." }),
  })).min(1, { message: "At least one team member is required." }),
})

const defaultValues = {
  teamName: "",
  coreSkill: "",
  teamLeader: "",
  mentor: "",
  members: [{ name: "", role: "" }],
}

export function TeamRegistration() {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(0)

  const form = useForm({
    resolver: zodResolver(teamSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray({
    name: "members",
    control: form.control,
  })

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem('teamRegistrationData')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      form.reset(parsedData)
    }
  }, [form])

  useEffect(() => {
    // Auto-save to localStorage
    const subscription = form.watch((value) => {
      localStorage.setItem('teamRegistrationData', JSON.stringify(value))
    })
    return () => subscription.unsubscribe();
  }, [form])

  useEffect(() => {
    // Update progress
    const totalSteps = 3
    setProgress((step / totalSteps) * 100)
  }, [step])

  function onSubmit(data) {
    toast({
      title: "Team registered successfully",
      description: "Your team has been registered. You can now proceed to the next step.",
    })
    console.log(data)
    // Here you would typically send the data to your backend
  }

  return (
    (<div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Team Registration</CardTitle>
          <CardDescription>Register your team to get started with your entrepreneurial journey.</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full mb-6" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {step === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="teamName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your team name" {...field} />
                        </FormControl>
                        <FormDescription>Choose a unique name for your team.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />
                  <FormField
                    control={form.control}
                    name="coreSkill"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Core Skill</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your team's core skill" {...field} />
                        </FormControl>
                        <FormDescription>What's the primary skill or focus of your team?</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />
                </>
              )}
              {step === 2 && (
                <>
                  <FormField
                    control={form.control}
                    name="teamLeader"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team Leader</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter team leader's name" {...field} />
                        </FormControl>
                        <FormDescription>Who's leading this team?</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />
                  <FormField
                    control={form.control}
                    name="mentor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mentor (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter mentor's name (if any)" {...field} />
                        </FormControl>
                        <FormDescription>Do you have a mentor guiding your team?</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />
                </>
              )}
              {step === 3 && (
                <>
                  <div>
                    <Label>Team Members</Label>
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex gap-4 items-end mb-4">
                        <FormField
                          control={form.control}
                          name={`members.${index}.name`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className={index !== 0 ? "sr-only" : undefined}>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Member name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        <FormField
                          control={form.control}
                          name={`members.${index}.role`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className={index !== 0 ? "sr-only" : undefined}>Role</FormLabel>
                              <FormControl>
                                <Input placeholder="Member role" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        <Button type="button" variant="outline" size="icon" onClick={() => remove(index)}>
                          -
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => append({ name: "", role: "" })}>
                      Add Team Member
                    </Button>
                  </div>
                </>
              )}
            </form>
          </Form>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
            disabled={step === 1}>
            Previous
          </Button>
          <Button
            onClick={() => {
              if (step < 3) {
                setStep((prev) => prev + 1)
              } else {
                form.handleSubmit(onSubmit)()
              }
            }}>
            {step < 3 ? "Next" : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </div>)
  );
}