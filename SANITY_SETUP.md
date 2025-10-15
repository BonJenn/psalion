# Sanity CMS Setup for Psalion Website

## Overview
The Sanity CMS has been configured with automated features to streamline content creation for the "Mentions and Featured Content" section.

## Features

### 1. URL Data Extraction
When you paste an article URL, the system will automatically:
- Extract the site name from the URL and populate the Publisher Name field
- Set today's date as the publish date
- Generate a favicon URL for the Publisher Logo field
- You just need to fill in the article title manually

### 2. Interviewee Management
- **Pre-populated List**: Select from existing interviewees
- **Auto-populate Headshots**: When you select an interviewee, their headshot automatically populates
- **Add New Interviewees**: Create new interviewee profiles on the fly

## How to Use

### Creating a New Mention/Article

1. **Go to Sanity Studio** (`http://localhost:3000/studio`)
2. **Click "Create"** → **"Mention & Featured Content"**
3. **Paste the Article URL** in the first field
   - ✅ **Publisher Name** will auto-populate
   - ✅ **Publish Date** will auto-populate (today's date)
   - ✅ **Publisher Logo** will auto-populate with favicon URL
4. **Select Publisher** from the dropdown:
   - **Existing publishers** will auto-populate their name (logo if available)
   - **Add new publisher** if it's not in the list (logo can be added later)
   - **Publisher data is saved** for future use
5. **Fill in the Article Title** manually
6. **Toggle "Is Interview?"** if it's an interview
7. **If it's an interview**:
   - Select an interviewee from the dropdown
   - Their headshot will auto-populate
   - Or click "Add New Interviewee" to create a new profile
8. **Set Display Order** (0 = first, 1 = second, etc.)
9. **Save** the entry

### Deleting Articles

- **To delete an article**: In the document view, click the "..." menu in the top right and select "Delete"
- **To delete an interviewee**: In the interviewee list, click the "..." menu and select "Delete"

### Managing Publishers

1. **Go to "Publisher"** in the Sanity Studio
2. **Create new publisher profiles** with:
   - Publisher Name
   - Publisher Logo
   - Website URL (optional)
   - Description (optional)
3. **Edit existing publisher profiles** as needed
4. **Publishers are automatically suggested** when creating new mentions

### Managing Interviewees

1. **Go to "Interviewee"** in the Sanity Studio
2. **Create new interviewee profiles** with:
   - Full name
   - Job title
   - Company
   - Headshot image
   - Short bio
3. **These profiles** will then be available in the dropdown when creating mentions

## Content Types

### Mention & Featured Content
- `articleUrl` - The article URL (auto-populates other fields)
- `publisherName` - Publisher name (auto-populated)
- `publisherLogo` - Publisher logo (manual upload)
- `articleTitle` - Article title (auto-populated)
- `isInterview` - Whether it's an interview
- `intervieweeName` - Interviewee name (from dropdown or manual)
- `intervieweeHeadshot` - Interviewee photo (auto-populated if interviewee exists)
- `publishDate` - Publish date (auto-populated)
- `featured` - Whether to show on website
- `order` - Display order

### Interviewee
- `name` - Full name
- `title` - Job title
- `company` - Company name
- `headshot` - Profile photo
- `bio` - Short biography

## Tips

1. **Always paste the full URL** including `https://`
2. **Check the console** for favicon URLs when creating mentions
3. **Create interviewee profiles first** for better organization
4. **Use consistent naming** for interviewees
5. **Set order numbers** to control display sequence

## Troubleshooting

- **URL not auto-populating?** Check that the URL is valid and accessible
- **Interviewee not showing?** Make sure the interviewee profile exists
- **Headshot not auto-populating?** Ensure the interviewee has a headshot uploaded
- **CORS errors?** Make sure `http://localhost:3000` is in your Sanity CORS origins
