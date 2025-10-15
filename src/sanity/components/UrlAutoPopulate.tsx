import React, { useCallback, useState, useEffect } from 'react'
import { set, unset } from 'sanity'
import { StringInputProps } from 'sanity'
import { Stack, Text, Button, Spinner } from '@sanity/ui'

export function UrlAutoPopulate(props: StringInputProps) {
  const { value, onChange } = props
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [extractedData, setExtractedData] = useState<any>(null)

  const extractBasicData = useCallback((url: string) => {
    if (!url || !url.startsWith('http')) return

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')
      
          // Extract basic data from URL
          const extracted = {
            siteName: hostname,
            publishedTime: new Date().toISOString().split('T')[0], // Today's date as default
            favicon: `https://${hostname}/favicon.ico`,
            articleTitle: '' // Empty title for manual entry
          }
      
      setExtractedData(extracted)
      setSuccess('✅ Data extracted! Copy the values below to the form fields.')
      console.log('Extracted data from URL:', extracted)
      
    } catch (err) {
      setError('Invalid URL format. Please check the URL and try again.')
      console.error('Error processing URL:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleUrlChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    onChange(newValue ? set(newValue) : unset())
    
    // Clear previous messages and data when URL changes
    if (error) {
      setError(null)
    }
    if (success) {
      setSuccess(null)
    }
    if (extractedData) {
      setExtractedData(null)
    }
    
    // Auto-extract data when URL is pasted (if it looks like a valid URL)
    if (newValue && newValue.startsWith('http') && newValue.length > 10) {
      // Small delay to let the URL field update first
      setTimeout(() => {
        extractBasicData(newValue)
      }, 500)
    }
  }, [onChange, error, success, extractedData, extractBasicData])

  return (
    <Stack space={3}>
      <div>
        <input
          type="url"
          value={value || ''}
          onChange={handleUrlChange}
          placeholder="Paste article URL here - fields will auto-populate"
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
        {isLoading && (
          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Spinner />
            <Text size={1}>Auto-populating fields...</Text>
          </div>
        )}
        {error && (
          <Text size={1} style={{ color: 'red', marginTop: '8px' }}>
            {error}
          </Text>
        )}
        {success && (
          <Text size={1} style={{ color: 'green', marginTop: '8px' }}>
            {success}
          </Text>
        )}
      </div>
      {value && !success && !isLoading && (
        <Button
          text="Manual Extract (if auto-extract didn't work)"
          tone="secondary"
          mode="ghost"
          onClick={() => extractBasicData(value)}
          disabled={isLoading}
        />
      )}
      {extractedData && (
        <div style={{ 
          marginTop: '12px', 
          padding: '12px', 
          backgroundColor: '#f0f9ff', 
          border: '1px solid #0ea5e9',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
              <Text size={1} weight="medium" style={{ color: '#0369a1' }}>✅ Extracted Data - Copy to fields below:</Text>
              <div style={{ marginTop: '8px' }}>
                <div style={{ marginBottom: '4px' }}>
                  <strong style={{ color: '#1a202c' }}>Publisher Name:</strong> 
                  <input 
                    type="text" 
                    value={extractedData.siteName} 
                    readOnly 
                    style={{ 
                      marginLeft: '8px', 
                      padding: '2px 4px', 
                      border: '1px solid #ccc', 
                      borderRadius: '2px',
                      fontSize: '11px',
                      width: '200px',
                      backgroundColor: '#fff',
                      color: '#1a202c'
                    }}
                    onClick={(e) => e.target.select()}
                  />
                </div>
                <div style={{ marginBottom: '4px' }}>
                  <strong style={{ color: '#1a202c' }}>Article Title:</strong> 
                  <input 
                    type="text" 
                    value={extractedData.articleTitle} 
                    readOnly 
                    placeholder="Enter article title manually"
                    style={{ 
                      marginLeft: '8px', 
                      padding: '2px 4px', 
                      border: '1px solid #ccc', 
                      borderRadius: '2px',
                      fontSize: '11px',
                      width: '300px',
                      backgroundColor: '#fff',
                      color: '#1a202c'
                    }}
                    onClick={(e) => e.target.select()}
                  />
                </div>
                <div style={{ marginBottom: '4px' }}>
                  <strong style={{ color: '#1a202c' }}>Publish Date:</strong> 
                  <input 
                    type="date" 
                    value={extractedData.publishedTime} 
                    readOnly 
                    style={{ 
                      marginLeft: '8px', 
                      padding: '2px 4px', 
                      border: '1px solid #ccc', 
                      borderRadius: '2px',
                      fontSize: '11px',
                      backgroundColor: '#fff',
                      color: '#1a202c'
                    }}
                    onClick={(e) => e.target.select()}
                  />
                </div>
                <div style={{ marginBottom: '4px' }}>
                  <strong style={{ color: '#1a202c' }}>Favicon URL:</strong> 
                  <input 
                    type="text" 
                    value={extractedData.favicon} 
                    readOnly 
                    style={{ 
                      marginLeft: '8px', 
                      padding: '2px 4px', 
                      border: '1px solid #ccc', 
                      borderRadius: '2px',
                      fontSize: '11px',
                      width: '300px',
                      backgroundColor: '#fff',
                      color: '#1a202c'
                    }}
                    onClick={(e) => e.target.select()}
                  />
                </div>
              </div>
          <Text size={1} style={{ marginTop: '8px', fontStyle: 'italic', color: '#0369a1' }}>
            💡 Click on any field above to select all text, then copy and paste into the form fields below.
          </Text>
        </div>
      )}
    </Stack>
  )
}
