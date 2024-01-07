export default function DashboardRolesPage() {
  return (
    <ServerPermissionBoundry permission="roles.read" fallback={<RolesReadFallback />}>
      <ScrollArea className="flex min-h-0 grow items-center justify-center">
        <main className="flex grow flex-col items-center justify-center gap-10 px-4">
          <Typography variant="h1" className="mb-4 self-start">
            Roles
          </Typography>
          <RolesTable />
        </main>
      </ScrollArea>
    </ServerPermissionBoundry>
  );
}
