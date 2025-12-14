import { ComponentPropsWithoutRef, ElementType } from "react"

type PolimorfProps<E extends ElementType> = {
  as?: E
  children?: string
} & Omit<ComponentPropsWithoutRef<E>, 'as'>

export const PolimorfButton = <E extends ElementType = 'button'>(props: PolimorfProps<E>) => {
  const {as, children, ...rest} = props
  const Component = as || 'button'
  return (
    <div>
      <p>Is it btn or link?</p>
      <Component {...rest}>{children}</Component>
    </div>
  )
}

