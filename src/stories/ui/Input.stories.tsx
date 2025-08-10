import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from '@/components/ui/input';
import { Search, Mail, Lock } from 'lucide-react';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Types: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="search" placeholder="Search input" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input className="pl-10" placeholder="Search..." />
      </div>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input className="pl-10" type="email" placeholder="Email address" />
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input className="pl-10" type="password" placeholder="Password" />
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input placeholder="Normal state" />
      <Input placeholder="Disabled state" disabled />
      <Input placeholder="With value" defaultValue="Sample text" />
    </div>
  ),
};