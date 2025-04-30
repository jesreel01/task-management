const AuthForm = ({ children, ...props }: React.ComponentProps<"form">) => {
  return (
    <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-sm border py-6 shadow-sm">
      <form className="w-sm px-8 flex flex-col items-center gap-0" {...props}>
        {children}
      </form>
    </div>
  )
}

export default AuthForm
