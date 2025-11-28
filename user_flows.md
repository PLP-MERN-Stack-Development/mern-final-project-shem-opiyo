# User Flows for Pro Bono Legal Services Platform

## Overview
The platform connects clients with pro bono legal services through a hierarchical system where senior advocates supervise junior legal assistants in their interactions with clients.

## User Roles
1. **Client**: Individuals seeking free legal assistance
2. **Junior Legal Assistant**: Law students, intern lawyers, advocates not yet fully qualified, or junior qualified lawyers seeking exposure
3. **Senior Advocate**: Fully qualified and practicing advocates of the high court

## User Flows

### 1. Client Flow
1. **Registration/Login**: 
   - Navigate to homepage
   - Click "Get Legal Help" or register/login as a client
   - Provide basic information (name, email, contact details)

2. **Case Creation**:
   - Access client dashboard
   - Click "Start New Case" 
   - Fill in case details and legal issue description
   - Get assigned to a junior legal assistant

3. **Chat Interaction**:
   - Enter chat room with assigned junior legal assistant
   - Discuss legal issue and provide necessary documentation
   - Continue conversation until resolution or case closure

4. **Case Management**:
   - View all active and closed cases in dashboard
   - Resume previous conversations
   - Track case progress

### 2. Junior Legal Assistant Flow
1. **Registration**:
   - Navigate to registration page
   - Select "Junior Legal Assistant" role
   - Provide credentials (name, email, law school/institution, qualifications)
   - Account created with 30-day grace period to join an advocate

2. **Advocate Search**:
   - If not attached to an advocate, see "Find Advocate" prompt
   - Browse available senior advocates with specializations and ratings
   - Send join requests to preferred advocates
   - Wait for approval

3. **Community Management**:
   - Receive notifications about join requests status
   - If accepted, become part of advocate's community
   - If rejected, continue searching for another advocate
   - Warning system as grace period approaches end

4. **Client Interaction**:
   - Receive client case assignments from system
   - Engage in chat with clients to understand their legal issues
   - Provide initial legal guidance
   - Know that senior advocate is supervising the conversation

5. **Feedback Reception**:
   - Receive feedback from supervising advocate on interactions
   - View feedback with emojis (thumbs up, heart, book) and comments
   - Improve based on guidance provided

### 3. Senior Advocate Flow
1. **Registration/Login**:
   - Register as "Senior Advocate" or "Advocate"
   - Verify credentials and qualifications
   - Access advocate dashboard

2. **Junior Management**:
   - View join requests from junior legal assistants
   - Accept or reject requests based on capacity and compatibility
   - Manage existing junior legal assistants in their community
   - Remove juniors if necessary

3. **Supervision**:
   - Monitor ongoing conversations between juniors and clients
   - View real-time chat interactions
   - Assess quality of service provided by juniors

4. **Feedback Provision**:
   - Provide feedback on junior-client interactions
   - Use emojis (thumbs up for good, heart for empathetic, book for educational)
   - Add comments with suggestions for improvement
   - Recommend reading materials and legal concepts

5. **Case Oversight**:
   - Review complex cases handled by juniors
   - Intervene when necessary
   - Ensure quality of legal service provided

## Additional Required Pages

### 1. Advocate Profile Page
- Display advocate's credentials, specializations, ratings
- Show community of junior legal assistants
- List of current cases being supervised

### 2. Junior Community Dashboard
- For advocates to manage their junior assistants
- View join requests, send invitations
- Monitor junior performance

### 3. Feedback Dashboard
- For advocates to review and provide feedback
- Track junior improvement over time

### 4. Case Supervision Interface
- Real-time view of junior-client interactions
- Ability to provide immediate feedback or intervention

### 5. Notification Center
- For all user types to receive important updates
- Join requests, feedback received, case updates

## Key Features to Implement

### 1. Real-time Chat System
- With supervision capabilities
- Message history and case tracking

### 2. Advocate-Junior Matching System
- With 30-day grace period enforcement
- Join request workflow

### 3. Feedback System
- Emoji-based reactions (thumbs up, heart, book)
- Text comments with improvement suggestions
- Resource recommendations

### 4. Case Management System
- Case assignment and tracking
- Status updates and closure

### 5. Notification System
- Real-time notifications for all user interactions
- Grace period warnings for juniors

This flow ensures that clients receive supervised legal assistance while providing a structured learning environment for junior legal assistants under the guidance of senior advocates.