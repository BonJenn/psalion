import React, { useCallback, useEffect, useState } from 'react'
import { set, unset } from 'sanity'
import { ObjectInputProps, useClient } from 'sanity'
import { Stack, Text, Button, Select, Card, Flex, Spinner } from '@sanity/ui'

interface Publisher {
  _id: string
  name: string
  logo: {
    asset: {
      _ref: string
    }
  }
  website?: string
}

export function PublisherSelector(props: ObjectInputProps) {
  const { value, onChange } = props
  const [publishers, setPublishers] = useState<Publisher[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newPublisherName, setNewPublisherName] = useState('')
  const [selectedPublisher, setSelectedPublisher] = useState<Publisher | null>(null)
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)
  
  const client = useClient({ apiVersion: '2023-01-01' })

  // Fetch publishers from Sanity
  useEffect(() => {
    const fetchPublishers = async () => {
      setIsLoading(true)
      try {
        const data = await client.fetch('*[_type == "publisher"] | order(name asc)')
        setPublishers(data)
        // Set initial selected publisher if value exists
        if (value?.publisherName) {
          const initialSelected = data.find((p: Publisher) => p.name === value.publisherName);
          setSelectedPublisher(initialSelected || null);
        }
      } catch (error) {
        console.error('Error fetching publishers:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPublishers()
  }, [client, value?.publisherName])

  const handlePublisherSelect = useCallback((publisherId: string) => {
    if (publisherId === '') {
      onChange(unset())
      setSelectedPublisher(null)
      return
    }

    const publisher = publishers.find(p => p._id === publisherId)
    if (publisher) {
      // Update the form with the selected publisher's data
      onChange(set({
        publisherName: publisher.name,
        publisherLogo: publisher.logo || null
      }))
      setSelectedPublisher(publisher)
    }
  }, [publishers, onChange])

  const handleLogoUpload = useCallback(async (file: File) => {
    if (!selectedPublisher) return

    setIsUploadingLogo(true)
    try {
      // Upload the image to Sanity
      const asset = await client.assets.upload('image', file)
      
      // Update the publisher with the new logo
      const updatedPublisher = await client
        .patch(selectedPublisher._id)
        .set({ logo: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
        .commit()

      // Update local state
      setPublishers(prev => prev.map(p => 
        p._id === selectedPublisher._id ? updatedPublisher : p
      ))
      setSelectedPublisher(updatedPublisher)

      // Update the form with the new logo
      onChange(set({
        publisherName: selectedPublisher.name,
        publisherLogo: updatedPublisher.logo
      }))
    } catch (error) {
      console.error('Error uploading logo:', error)
    } finally {
      setIsUploadingLogo(false)
    }
  }, [selectedPublisher, client, onChange])

  const handleAddNewPublisher = useCallback(async () => {
    if (!newPublisherName.trim()) return

    try {
      const newPublisher = await client.create({
        _type: 'publisher',
        name: newPublisherName.trim()
        // Logo will be added separately by the user
      })

      setPublishers(prev => [...prev, newPublisher])
      setNewPublisherName('')
      setShowAddForm(false)
      
      // Auto-select the new publisher
      handlePublisherSelect(newPublisher._id)
    } catch (error) {
      console.error('Error creating publisher:', error)
    }
  }, [newPublisherName, client, handlePublisherSelect])

  return (
    <Stack space={3}>
      <div>
        <Text size={1} weight="medium" style={{ marginBottom: '8px' }}>
          Select Publisher
        </Text>
        <Select
          value={selectedPublisher?._id || ''}
          onChange={(event) => handlePublisherSelect(event.currentTarget.value)}
          disabled={isLoading}
        >
          <option value="">Choose a publisher...</option>
          {publishers.map((publisher) => (
            <option key={publisher._id} value={publisher._id}>
              {publisher.name}
            </option>
          ))}
        </Select>
      </div>

      {!showAddForm ? (
        <Button
          text="Add New Publisher"
          tone="primary"
          mode="ghost"
          onClick={() => setShowAddForm(true)}
        />
      ) : (
        <Card padding={3} radius={2} shadow={1}>
          <Stack space={3}>
            <Text size={1} weight="medium">Add New Publisher</Text>
            <input
              type="text"
              value={newPublisherName}
              onChange={(e) => setNewPublisherName(e.target.value)}
              placeholder="Enter publisher name"
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
                onClick={handleAddNewPublisher}
                disabled={!newPublisherName.trim()}
              />
              <Button
                text="Cancel"
                mode="ghost"
                onClick={() => {
                  setShowAddForm(false)
                  setNewPublisherName('')
                }}
              />
            </Flex>
          </Stack>
        </Card>
      )}

      {selectedPublisher && (
        <Card padding={3} radius={2} shadow={1} style={{ backgroundColor: '#f0f9ff', border: '1px solid #0ea5e9' }}>
          <Stack space={3}>
            <Text size={1} weight="medium" style={{ color: '#0369a1' }}>Selected Publisher</Text>
            <Text size={1}>{selectedPublisher.name}</Text>
            {selectedPublisher.website && (
              <Text size={1} muted>{selectedPublisher.website}</Text>
            )}
            
            {/* Logo Upload Section */}
            <div>
              <Text size={1} weight="medium" style={{ marginBottom: '8px' }}>Publisher Logo</Text>
              {selectedPublisher.logo ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '32px', height: '32px', backgroundColor: '#f3f4f6', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text size={1}>📷</Text>
                  </div>
                  <Text size={1} style={{ color: '#059669' }}>✅ Logo uploaded</Text>
                </div>
              ) : (
                <Text size={1} style={{ color: '#dc2626', marginBottom: '8px' }}>⚠️ No logo uploaded</Text>
              )}
              
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleLogoUpload(file)
                  }
                }}
                disabled={isUploadingLogo}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #4a5568',
                  borderRadius: '4px',
                  fontSize: '12px',
                  backgroundColor: '#2d3748',
                  color: '#e2e8f0'
                }}
              />
              {isUploadingLogo && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                  <Spinner />
                  <Text size={1}>Uploading logo...</Text>
                </div>
              )}
            </div>
            
            <Text size={1} style={{ fontStyle: 'italic', color: '#0369a1' }}>
              ✅ Publisher data will be auto-populated below
            </Text>
          </Stack>
        </Card>
      )}
    </Stack>
  )
}
