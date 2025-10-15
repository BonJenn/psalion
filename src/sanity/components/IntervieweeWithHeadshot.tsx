import React, { useCallback, useEffect, useState } from 'react'
import { set, unset } from 'sanity'
import { ObjectInputProps, useClient } from 'sanity'
import { Stack, Text, Button, Select, Card, Flex } from '@sanity/ui'

interface Interviewee {
  _id: string
  name: string
  title: string
  company: string
  headshot: {
    asset: {
      _ref: string
    }
  }
  bio: string
}

export function IntervieweeWithHeadshot(props: ObjectInputProps) {
  const { value, onChange } = props
  const [interviewees, setInterviewees] = useState<Interviewee[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newIntervieweeName, setNewIntervieweeName] = useState('')
  const [selectedInterviewee, setSelectedInterviewee] = useState<Interviewee | null>(null)
  
  const client = useClient({ apiVersion: '2023-01-01' })

  // Fetch interviewees from Sanity
  useEffect(() => {
    const fetchInterviewees = async () => {
      setIsLoading(true)
      try {
        const data = await client.fetch('*[_type == "interviewee"] | order(name asc)')
        setInterviewees(data)
        // Set initial selected interviewee if value exists
        if (value?.intervieweeName) {
          const initialSelected = data.find((i: Interviewee) => i.name === value.intervieweeName);
          setSelectedInterviewee(initialSelected || null);
        }
      } catch (error) {
        console.error('Error fetching interviewees:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchInterviewees()
  }, [client, value?.intervieweeName])

  const handleIntervieweeSelect = useCallback((intervieweeId: string) => {
    if (intervieweeId === '') {
      onChange(unset())
      setSelectedInterviewee(null)
      return
    }

    const interviewee = interviewees.find(i => i._id === intervieweeId)
    if (interviewee) {
      // Update both name and headshot in the form
      onChange(set({
        intervieweeName: interviewee.name,
        intervieweeHeadshot: interviewee.headshot
      }))
      setSelectedInterviewee(interviewee)
    }
  }, [interviewees, onChange])

  const handleAddNewInterviewee = useCallback(async () => {
    if (!newIntervieweeName.trim()) return

    try {
      const newInterviewee = await client.create({
        _type: 'interviewee',
        name: newIntervieweeName.trim(),
        title: '',
        company: '',
        bio: ''
      })

      setInterviewees(prev => [...prev, newInterviewee])
      setNewIntervieweeName('')
      setShowAddForm(false)
      
      // Auto-select the new interviewee
      handleIntervieweeSelect(newInterviewee._id)
    } catch (error) {
      console.error('Error creating interviewee:', error)
    }
  }, [newIntervieweeName, client, handleIntervieweeSelect])

  return (
    <Stack space={3}>
      <div>
        <Text size={1} weight="medium" style={{ marginBottom: '8px' }}>
          Select Interviewee
        </Text>
        <Select
          value={selectedInterviewee?._id || ''}
          onChange={(event) => handleIntervieweeSelect(event.currentTarget.value)}
          disabled={isLoading}
        >
          <option value="">Choose an interviewee...</option>
          {interviewees.map((interviewee) => (
            <option key={interviewee._id} value={interviewee._id}>
              {interviewee.name} {interviewee.title && `- ${interviewee.title}`}
            </option>
          ))}
        </Select>
      </div>

      {!showAddForm ? (
        <Button
          text="Add New Interviewee"
          tone="primary"
          mode="ghost"
          onClick={() => setShowAddForm(true)}
        />
      ) : (
        <Card padding={3} radius={2} shadow={1}>
          <Stack space={3}>
            <Text size={1} weight="medium">Add New Interviewee</Text>
            <input
              type="text"
              value={newIntervieweeName}
              onChange={(e) => setNewIntervieweeName(e.target.value)}
              placeholder="Enter interviewee name"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
            <Flex gap={2}>
              <Button
                text="Add"
                tone="primary"
                onClick={handleAddNewInterviewee}
                disabled={!newIntervieweeName.trim()}
              />
              <Button
                text="Cancel"
                mode="ghost"
                onClick={() => {
                  setShowAddForm(false)
                  setNewIntervieweeName('')
                }}
              />
            </Flex>
          </Stack>
        </Card>
      )}

      {selectedInterviewee && (
        <Card padding={3} radius={2} shadow={1} style={{ backgroundColor: '#f0f9ff', border: '1px solid #0ea5e9' }}>
          <Stack space={2}>
            <Text size={1} weight="medium" style={{ color: '#0369a1' }}>Selected Interviewee</Text>
            <Text size={1}>{selectedInterviewee.name}</Text>
            {selectedInterviewee.title && (
              <Text size={1} muted>{selectedInterviewee.title} at {selectedInterviewee.company}</Text>
            )}
            {selectedInterviewee.headshot ? (
              <Text size={1} style={{ color: '#059669' }}>✅ Headshot will be auto-populated</Text>
            ) : (
              <Text size={1} style={{ color: '#dc2626' }}>⚠️ No headshot available</Text>
            )}
            <Text size={1} style={{ fontStyle: 'italic', color: '#0369a1' }}>
              ✅ Interviewee data will be auto-populated below
            </Text>
          </Stack>
        </Card>
      )}
    </Stack>
  )
}
