# Architecture Document: {{project_name}}

**Date:** {{date}}
**Author:** {{user_name}}
**Mode:** {{project_mode}}
**Status:** Draft

---

## Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Frontend | {{frontend}} | {{frontend_rationale}} |
| Backend | {{backend}} | {{backend_rationale}} |
| Database | {{database}} | {{database_rationale}} |
| Hosting | {{hosting}} | {{hosting_rationale}} |
| Auth | {{auth}} | {{auth_rationale}} |

## Data model

{{data_model}}

## API design

### Endpoints

{{api_endpoints}}

### Error format

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message"
  }
}
```

### Authentication

{{auth_strategy}}

### Pagination

{{pagination_strategy}}

## Architectural decisions

_Key decisions made and their rationale._

| Decision | Choice | Alternatives considered | Why |
|----------|--------|------------------------|-----|
{{architectural_decisions}}

## Edge cases & infrastructure

### File uploads
{{file_uploads}}

### Real-time features
{{realtime}}

### Background jobs
{{background_jobs}}

### Caching
{{caching}}

### Rate limiting
{{rate_limiting}}

### Email / notifications
{{notifications}}

## Environment strategy

{{environments}}

## Deployment

{{deployment_strategy}}
