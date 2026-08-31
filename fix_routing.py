import os

app_path = "../aszend_app/src/App.jsx"
with open(app_path, "r", encoding="utf-8") as f:
    app = f.read()

# I need to fetch hasCompletedOnboarding in AppContent
app = app.replace("const { isPanicRoomActive, isAuthenticated } = useAppContext();", "const { isPanicRoomActive, isAuthenticated, hasCompletedOnboarding } = useAppContext();")

routing_logic_old = """  const isPublicRoute = location.pathname === '/auth' || location.pathname === '/onboarding';

  // If not authenticated and trying to access a private route, redirect to auth
  if (!isAuthenticated && !isPublicRoute) {
    return <Navigate to="/auth" replace />;
  }

  // If authenticated and trying to access auth/onboarding, redirect to home
  if (isAuthenticated && isPublicRoute) {
    return <Navigate to="/" replace />;
  }"""

routing_logic_new = """  const isPublicRoute = location.pathname === '/auth' || location.pathname === '/onboarding';

  // Strict funnel: Onboarding -> Auth -> App
  if (!hasCompletedOnboarding && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }
  
  if (hasCompletedOnboarding && !isAuthenticated && location.pathname !== '/auth') {
    return <Navigate to="/auth" replace />;
  }

  // If authenticated and trying to access auth/onboarding, redirect to home
  if (isAuthenticated && isPublicRoute) {
    return <Navigate to="/" replace />;
  }"""

app = app.replace(routing_logic_old, routing_logic_new)

with open(app_path, "w", encoding="utf-8") as f:
    f.write(app)
