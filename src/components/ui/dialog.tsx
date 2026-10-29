'use client';
import { cva, VariantProps } from 'class-variance-authority';

import * as React from 'react';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

// DialogOverlayVariants

const dialogOverlayVariants = cva(
  'fixed inset-0 z-50 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
  {
    variants: {
      variant: {
        default: 'bg-black/50',
        blurred: 'bg-black/40 backdrop-blur-[2px]',
        dark: 'bg-black/60',
        light: 'bg-black/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function DialogOverlay({
  className,
  variant,
  ...props
}: DialogPrimitive.Backdrop.Props &
  VariantProps<typeof dialogOverlayVariants>) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(dialogOverlayVariants({ variant }), className)}
      {...props}
    />
  );
}

// DialogContent variants

const dialogContentVariants = cva(
  'fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 p-6 shadow-lg duration-200',
  {
    variants: {
      variant: {
        default:
          'bg-background border rounded-lg max-w-[calc(100%-2rem)] sm:max-w-lg',

        appointment:
          'bg-background-tertiary border-none rounded-lg max-w-[calc(100%-2rem)] sm:max-w-[477px] max-h-[90vh] overflow-y-auto',
        large:
          'bg-background border rounded-lg max-w-[calc(100%-2rem)] sm:max-w-2xl',
        fullscreen:
          'bg-background border rounded-lg max-w-[calc(100%-1rem)] max-h-[calc(100%-1rem)] sm:max-w-4xl sm:max-h-[90vh] overflow-y-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function DialogContent({
  className,
  children,
  showCloseButton = true,
  variant,
  overlayVariant,
  ...props
}: DialogPrimitive.Popup.Props &
  VariantProps<typeof dialogContentVariants> & {
    showCloseButton?: boolean;
    overlayVariant?: VariantProps<typeof dialogOverlayVariants>['variant'];
  }) {
  return (
    <DialogPortal>
      <DialogOverlay variant={overlayVariant} />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(dialogContentVariants({ variant }), className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-2 right-2"
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

// DialogHeader variants

const dialogHeaderVariants = cva('flex flex-col gap-2', {
  variants: {
    align: {
      left: 'text-left',
      center: 'text-center sm:text-left',
      right: 'text-right',
    },
  },
  defaultVariants: {
    align: 'center',
  },
});

function DialogHeader({
  className,
  align,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof dialogHeaderVariants>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(dialogHeaderVariants({ align }), className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        '-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  );
}

// DialogTitle variants

const dialogTitleVariants = cva('leading-none font-semibold', {
  variants: {
    size: {
      sm: 'text-base',
      default: 'text-lg',
      lg: 'text-xl',
      xl: 'text-2xl',
      modal: 'text-title-modal',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

function DialogTitle({
  className,
  size,
  ...props
}: DialogPrimitive.Title.Props & VariantProps<typeof dialogTitleVariants>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(dialogTitleVariants({ size }), className)}
      {...props}
    />
  );
}

// DialogDescription Variants

const dialogDescriptionVariants = cva('', {
  variants: {
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
      modal: 'text-paragraph-medium text-content-secondary',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

function DialogDescription({
  className,
  size,
  ...props
}: DialogPrimitive.Description.Props &
  VariantProps<typeof dialogDescriptionVariants>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(dialogDescriptionVariants({ size }), className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
