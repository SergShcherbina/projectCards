import { ComponentProps, FC } from 'react'

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogClose,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import { Typography } from '../typography'

import { default as Close } from './img/close.tsx'
import s from './modal.module.scss'

export type ModalSize = 'sm' | 'md' | 'lg'

export type ModalProps = {
  /** The controlled open state of the dialog */
  isOpen: boolean
  onClose?: () => void
  showCloseIcon?: boolean
  title?: string
  /** 'sm' | 'md' | 'lg':
   * sm - 367px,
   * md - 532px,
   * lg - 764px.
   * For other values use className */
  size?: ModalSize
} & ComponentProps<'div'>

export const Modal: FC<ModalProps> = ({
  isOpen = false,
  size = 'md',
  title,
  showCloseIcon = true,
  className,
  onClose,
  children,
}) => {
  function handleModalClosed() {
    onClose?.()
  }
  const classNames = {
    overlay: s.overlay,
    content: getContentClassName(size, className),
    header: s.header,
    closeIcon: s.closeIcon,
    title: s.title,
    main: s.main,
    footer: s.footer,
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClosed}>
      {isOpen && (
        <DialogPortal forceMount>
          <DialogOverlay asChild></DialogOverlay>
          <DialogContent className={classNames.content} asChild forceMount>
            <div>
              <header className={classNames.header}>
                {title && (
                  <DialogTitle asChild>
                    <Typography as={'span'} variant="h2">
                      {title}
                    </Typography>
                  </DialogTitle>
                )}

                {showCloseIcon && (
                  <DialogClose className={classNames.closeIcon}>
                    <Close />
                  </DialogClose>
                )}
              </header>

              <main className={classNames.main}>{children}</main>
            </div>
          </DialogContent>
        </DialogPortal>
      )}
    </Dialog>
  )
}

function getContentClassName(size: ModalSize, className?: string) {
  const sizeClassName = getSizeClassName(size)

  return clsx(className, s.content, sizeClassName)
}

function getSizeClassName(size: ModalSize) {
  if (size === 'sm') return s.sm
  if (size === 'md') return s.md
  if (size === 'lg') return s.lg
}
