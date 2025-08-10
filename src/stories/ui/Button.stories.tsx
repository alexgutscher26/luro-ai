import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@/components/ui/button';
import { Heart, Download, Settings } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'tertiary', 'subtle', 'ghost', 'link', 'white'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'xl', 'icon', 'iconlg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="white">White</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button iconl={<Heart className="w-4 h-4" />}>With Left Icon</Button>
      <Button iconr={<Download className="w-4 h-4" />}>With Right Icon</Button>
      <Button size="icon"><Settings className="w-4 h-4" /></Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};