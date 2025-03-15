"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    darkMode: true,
    emailNotifications: true,
    projectUpdates: true,
    securityAlerts: true,
  })

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handleSave = () => {
    // In a real app, you would save these settings to a backend
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your dashboard preferences</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the dashboard looks and feels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Enable dark mode for the dashboard</p>
              </div>
              <Switch id="dark-mode" checked={settings.darkMode} onCheckedChange={() => handleToggle("darkMode")} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive email notifications for important updates</p>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={() => handleToggle("emailNotifications")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="project-updates">Project Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified when projects are updated</p>
              </div>
              <Switch
                id="project-updates"
                checked={settings.projectUpdates}
                onCheckedChange={() => handleToggle("projectUpdates")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="security-alerts">Security Alerts</Label>
                <p className="text-sm text-muted-foreground">Receive alerts about security issues</p>
              </div>
              <Switch
                id="security-alerts"
                checked={settings.securityAlerts}
                onCheckedChange={() => handleToggle("securityAlerts")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Preferences</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="font-medium">Email Address</p>
              <p className="text-sm text-muted-foreground">admin@example.com</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Account Type</p>
              <p className="text-sm text-muted-foreground">Administrator</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Change Password</Button>
            <Button variant="destructive">Delete Account</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

