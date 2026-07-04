import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/owners')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/owners"!</div>
}
