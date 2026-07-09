import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/owners/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/owners/$id"!</div>
}
