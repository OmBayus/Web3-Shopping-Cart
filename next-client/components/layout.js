import Appbar from './appbar'

export default function Layout({ children }) {
  return (
    <>
      <Appbar />
      <main>{children}</main>
    </>
  )
}