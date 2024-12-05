import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, LightbulbIcon, Search, BarChart3, PenTool, TestTubes, Package2 } from "lucide-react";
import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" to="/">
          <span className="font-bold text-2xl">BizCraft</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/about">
            About
          </Link>
          <Button variant="outline" asChild>
            <Link to="/login">Login</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Transform Your Project Management with BizCraft
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Streamline collaboration, boost productivity, and deliver exceptional results with our comprehensive
                  project management solution.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-black bg-slate-500 hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Project Development Roadmap</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <LightbulbIcon className="h-8 w-8 text-primary" />,
                  title: "Idea",
                  description: "Identify the problem or need",
                },
                {
                  icon: <Search className="h-8 w-8 text-primary" />,
                  title: "Research",
                  description: "Research similar projects, brainstorm solutions",
                },
                {
                  icon: <BarChart3 className="h-8 w-8 text-primary" />,
                  title: "Plan Your Project",
                  description: "Break the project into smaller tasks",
                },
                {
                  icon: <PenTool className="h-8 w-8 text-primary" />,
                  title: "Design & Build",
                  description: "Start with wireframes and begin development",
                },
                {
                  icon: <TestTubes className="h-8 w-8 text-primary" />,
                  title: "Test & Debug",
                  description: "Test features thoroughly, fix any issues",
                },
                {
                  icon: <Package2 className="h-8 w-8 text-primary" />,
                  title: "Product",
                  description: "Deploy and gather user feedback",
                },
              ].map((item, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      {item.icon}
                      <div>
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Why Choose BizCraft
                </div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything you need to manage projects effectively
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From ideation to delivery, BizCraft provides all the tools you need to succeed.
                </p>
              </div>
              <div className="grid gap-4">
                {[
                  "Real-time collaboration",
                  "Automated workflows",
                  "Advanced analytics",
                  "Resource management",
                  "Time tracking",
                  "Custom reporting",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "BizCraft has transformed how we manage projects. The intuitive interface and powerful features have increased our productivity significantly.",
                  author: "Tech Solutions Inc.",
                },
                {
                  quote:
                    "The best project management tool we've used. The roadmap feature helps us stay on track and meet deadlines consistently.",
                  author: "Creative Studios",
                },
                {
                  quote:
                    "Outstanding support team and regular updates. BizCraft continues to evolve and meet our growing needs.",
                  author: "Global Innovations",
                },
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-gray-500 italic">"{testimonial.quote}"</p>
                      <p className="font-medium text-sm">- {testimonial.author}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Ready to Transform Your Projects?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl">
                  Join thousands of successful teams already using BizCraft
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
   
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 BizCraft by OneBoat Solutions. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="/terms">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="/privacy">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
