import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from '@/components/ui/badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
    circle: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const WithCircle: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge circle>Live</Badge>
      <Badge circle variant="secondary">Processing</Badge>
      <Badge circle variant="destructive">Error</Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Badge variant="default">Active</Badge>
        <Badge variant="secondary">Pending</Badge>
        <Badge variant="destructive">Failed</Badge>
      </div>
      <div className="flex gap-2">
        <Badge circle variant="default">Online</Badge>
        <Badge circle variant="outline">Offline</Badge>
      </div>
    </div>
  ),
};