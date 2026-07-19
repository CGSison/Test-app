# Test-app

## Backend

Start the FastAPI server with:

```bash
python3 -m uvicorn server:app --host 0.0.0.0 --port 8000
```

The Vite dev server proxies `/api/*` requests to the FastAPI backend.
