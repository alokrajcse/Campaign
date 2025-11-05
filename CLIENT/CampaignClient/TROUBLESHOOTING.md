# Troubleshooting Guide

## 🚨 **Common Error: 500 Internal Server Error**

### **Error Message:**
```
POST https://localhost:44392/api/Leads 500 (Internal Server Error)
```

### **Possible Causes & Solutions:**

#### **1. Backend Server Not Running**
- **Check:** Is your ASP.NET Core backend running on `https://localhost:44392`?
- **Solution:** Start your backend server first

#### **2. CORS Issues**
- **Check:** Backend CORS configuration
- **Solution:** Add CORS policy in your backend:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

app.UseCors("AllowAngular");
```

#### **3. Model Validation Issues**
- **Check:** Backend expects specific Lead model format
- **Current Frontend Payload:**
```json
{
  "leadId": "string",
  "name": "string", 
  "email": "string",
  "phone": "string",
  "campaignId": "string",
  "segment": "string"
}
```

#### **4. Database Connection Issues**
- **Check:** Backend database connection string
- **Check:** Database server is running
- **Check:** Required tables exist

#### **5. Authentication Issues**
- **Check:** JWT token is being sent correctly
- **Check:** Backend JWT validation configuration

### **Quick Debug Steps:**

#### **1. Test Backend Directly**
```bash
# Test if backend is running
curl https://localhost:44392/api/Campaigns

# Test lead creation
curl -X POST https://localhost:44392/api/Leads \
  -H "Content-Type: application/json" \
  -d '{"leadId":"TEST001","name":"Test User","email":"test@test.com","phone":"+1234567890","campaignId":"Test Campaign","segment":"General"}'
```

#### **2. Check Browser Network Tab**
- Open Developer Tools → Network
- Try adding a lead
- Check the request payload and response

#### **3. Check Backend Logs**
- Look for detailed error messages in your ASP.NET Core console
- Check for validation errors, database errors, etc.

#### **4. Verify API Endpoints**
Make sure your backend has these endpoints:
- `POST /api/Leads` - Create lead
- `GET /api/Campaigns` - Get campaigns
- `POST /api/Campaigns` - Create campaign
- `PUT /api/Campaigns/{id}` - Update campaign
- `DELETE /api/Campaigns/{id}` - Delete campaign

### **Frontend Error Handling Added:**
- ✅ **Connection errors** (status 0) - Shows "Cannot connect to server"
- ✅ **Server errors** (status 500) - Shows "Server error" 
- ✅ **Detailed error messages** from backend response
- ✅ **Console logging** for debugging

### **Next Steps:**
1. **Start your backend server** on `https://localhost:44392`
2. **Check backend logs** for specific error details
3. **Verify CORS configuration** if getting connection errors
4. **Test API endpoints** directly with Postman/curl
5. **Check database connection** and table structure

The frontend is correctly configured - the issue is likely in the backend setup or configuration.