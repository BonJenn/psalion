import React from 'react'
import { ImageInputProps } from 'sanity'
import { Stack, Text, Card } from '@sanity/ui'

export function PublisherLogoInput(props: ImageInputProps) {
  return (
    <Stack space={3}>
      {/* Default Sanity Image Input */}
      <div>
        {props.renderDefault(props)}
      </div>
      
      {/* Instructions for URL usage */}
      <Card padding={3} radius={2} shadow={1} style={{ backgroundColor: '#f0f9ff', border: '1px solid #0ea5e9' }}>
        <Stack space={2}>
          <Text size={1} weight="medium" style={{ color: '#0369a1' }}>💡 Logo URL Tip</Text>
          <Text size={1} style={{ color: '#1a202c' }}>
            If you have a favicon URL from the extracted data above, you can:
          </Text>
          <Text size={1} style={{ color: '#1a202c' }}>
            1. Right-click the favicon URL and "Save image as..." to download it
          </Text>
          <Text size={1} style={{ color: '#1a202c' }}>
            2. Then upload the downloaded file using the upload area above
          </Text>
          <Text size={1} style={{ color: '#1a202c' }}>
            3. Or visit the URL in your browser and save the image manually
          </Text>
        </Stack>
      </Card>
    </Stack>
  )
}
