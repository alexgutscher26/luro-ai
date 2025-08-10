import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="switch-off" />
        <Label htmlFor="switch-off">Unchecked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="switch-on" defaultChecked />
        <Label htmlFor="switch-on">Checked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="switch-disabled" disabled />
        <Label htmlFor="switch-disabled">Disabled</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="switch-disabled-checked" disabled defaultChecked />
        <Label htmlFor="switch-disabled-checked">Disabled & Checked</Label>
      </div>
    </div>
  ),
};

export const Settings: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notifications</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email notifications</Label>
            <Switch id="email-notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications">Push notifications</Label>
            <Switch id="push-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-notifications">SMS notifications</Label>
            <Switch id="sms-notifications" disabled />
          </div>
        </div>
      </div>
    </div>
  ),
};