'use client'

import { useState, FormEvent, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Preset, presets } from '@/components/mockData'
import { Send, Paperclip, ListPlus, FileText, Files, Languages, Newspaper, Code, Mic, BookOpen, BarChart } from 'lucide-react'

export default function ChatApp() {
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null)
  const [chatMessages, setChatMessages] = useState<string[]>([])
  const [inputValues, setInputValues] = useState<Record<string, string>>({})
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const commandPaletteRef = useRef<HTMLDivElement>(null)

  // Handle showing/hiding command palette
  useEffect(() => {
    if (message.startsWith('/')) {
      const searchTerm = message.slice(1).toLowerCase()
      const hasMatches = presets.some(preset => 
        preset.slashCommand.toLowerCase().includes(searchTerm) ||
        preset.name.toLowerCase().includes(searchTerm)
      )
      setShowCommandPalette(hasMatches)
    } else {
      setShowCommandPalette(false)
    }
  }, [message])

  // Get filtered commands
  const getFilteredCommands = () => {
    if (!message.startsWith('/')) return []
    const searchTerm = message.slice(1).toLowerCase()
    return presets.filter(preset => 
      preset.slashCommand.toLowerCase().includes(searchTerm) ||
      preset.name.toLowerCase().includes(searchTerm)
    )
  }

  const handleCommandSelect = (preset: Preset) => {
    setSelectedPreset(preset)
    setInputValues({})
    setIsFormOpen(true)
    setShowCommandPalette(false)
    setMessage('')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (selectedPreset) {
      const messages = selectedPreset.inputs.map(input => 
        `${input.question}\nAnswer: ${inputValues[input.name] || ''}`
      )
      setChatMessages(prev => [...prev, `Used preset: ${selectedPreset.name}`, ...messages])
      setIsFormOpen(false)
    }
  }

  const handleSendMessage = () => {
    if (message.trim() && !message.startsWith('/')) {
      setChatMessages(prev => [...prev, `User: ${message}`])
      setMessage('')
    }
  }

  const getPresetIcon = (presetName: string) => {
    switch (presetName) {
      case 'Presenter Notes':
        return <FileText className="h-4 w-4" />
      case 'Document Comparison':
        return <Files className="h-4 w-4" />
      case 'Translation':
        return <Languages className="h-4 w-4" />
      case 'Release Notes':
        return <Newspaper className="h-4 w-4" />
      case 'Code Review':
        return <Code className="h-4 w-4" />
      case 'Meeting Minutes':
        return <Mic className="h-4 w-4" />
      case 'Blog Post':
        return <BookOpen className="h-4 w-4" />
      case 'Data Analysis':
        return <BarChart className="h-4 w-4" />
      default:
        return <ListPlus className="h-4 w-4" />
    }
  }

  const handleInputChange = (name: string, value: string) => {
    setInputValues(prev => ({ ...prev, [name]: value }))
  }

  const handlePresetFromDialog = (preset: Preset) => {
    setSelectedPreset(preset)
    setInputValues({})
    setIsFormOpen(true)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-1/4 bg-white dark:bg-gray-800 p-4 flex flex-col border-r border-gray-200 dark:border-gray-700">
        <ScrollArea className="flex-grow mb-4">
          {chatMessages.map((message, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="p-4">
                <p className="whitespace-pre-wrap">{message}</p>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
        <div className="mt-auto relative">
          <div className="rounded-lg border bg-white dark:bg-gray-800 shadow-sm">
            <Textarea
              ref={textareaRef}
              placeholder="Type / to see available commands..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                const value = e.target.value
                console.log('value', value)
                const preset = presets.filter(preset => 
                  preset.slashCommand.toLowerCase() == value
                )
                if (preset.length > 0) {
                  handleCommandSelect(preset[0])
                }
              }}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none min-h-[80px]"
              rows={3}
            />
            {showCommandPalette && (
              <div 
                ref={commandPaletteRef}
                className="absolute bottom-full left-0 right-0 bg-white dark:bg-gray-800 border rounded-lg shadow-lg mb-2 max-h-[300px] overflow-y-auto z-50"
              >
                {getFilteredCommands().map((preset) => (
                  <button
                    key={preset.id}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    onClick={() => handleCommandSelect(preset)}
                  >
                    {getPresetIcon(preset.name)}
                    <div>
                      <div className="font-medium">{preset.slashCommand}</div>
                      <div className="text-sm text-gray-500">{preset.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2 p-2 border-t">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    console.log('File selected:', file.name)
                  }
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Paperclip className="h-4 w-4" />
                <span className="sr-only">Attach file</span>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ListPlus className="h-4 w-4" />
                    <span className="sr-only">Select preset</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Select a Preset</DialogTitle>
                  </DialogHeader>
                  <Input
                    placeholder="Filter presets..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="mb-4"
                  />
                  <ScrollArea className="h-[400px] pr-4">
                    {['Recents', 'Native', 'Community'].map((category) => (
                      <div key={category} className="mb-6">
                        <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-2">{category}</h3>
                        <div className={`grid grid-cols-3 gap-2 p-2 rounded-lg ${
                          category === 'Recents' ? 'bg-blue-50 dark:bg-blue-900' :
                          category === 'Native' ? 'bg-green-50 dark:bg-green-900' :
                          'bg-purple-50 dark:bg-purple-900'
                        }`}>
                         {presets
                            .filter((preset) => preset.category === category)
                            .map((preset) => (
                              <Button
                                key={preset.id}
                                onClick={() => handlePresetFromDialog(preset)}
                                className="h-16 flex flex-col items-center justify-center text-center p-1"
                                variant="ghost"
                              >
                                {getPresetIcon(preset.name)}
                                <span className="mt-1 text-xs">{preset.name}</span>
                                <span className="text-[10px] text-gray-500">{preset.slashCommand}</span>
                              </Button>
                            ))}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </DialogContent>
              </Dialog>
              <div className="ml-auto">
                <Button size="icon" className="h-8 w-8" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/4 bg-gray-100 dark:bg-gray-800 p-4">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Generated Document</h2>
        <Card className="h-full">
          <CardContent className="p-6">
            <p className="dark:text-gray-300">Your generated document will appear here.</p>
          </CardContent>
        </Card>
      </div>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedPreset?.name || 'Fill in the details'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {selectedPreset?.inputs.map((input) => (
              <div key={input.name} className="space-y-2">
                <Label htmlFor={input.name} className="font-medium">
                  {input.question}
                </Label>
                {input.type === 'options' ? (
                  <Select
                    value={inputValues[input.name] || ''}
                    onValueChange={(value) => handleInputChange(input.name, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {input.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : input.type === 'document' || input.type === 'documentAttachment' ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      id={input.name}
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleInputChange(input.name, file.name)
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById(input.name)?.click()}
                      className="w-full justify-start"
                    >
                      <Paperclip className="w-4 h-4 mr-2" />
                      {inputValues[input.name] || 'Choose file'}
                    </Button>
                  </div>
                ) : (
                  <Input
                    id={input.name}
                    type="text"
                    value={inputValues[input.name] || ''}
                    onChange={(e) => handleInputChange(input.name, e.target.value)}
                    className="w-full"
                  />
                )}
              </div>
            ))}
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}