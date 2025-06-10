import { z } from 'zod';

export const userInfoSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  company: z.string().optional(),
  role: z.string().optional(),
});

export const projectDetailsSchema = z.object({
  title: z.string().min(2, 'Project title is required'),
  description: z.string().min(10, 'Project description is required'),
  category: z.string().optional(),
  timeline: z.string().optional(),
  urgency: z.string().optional(),
  techStack: z.array(z.string()).min(1, 'Please select at least one technology').default([]),
  requirements: z.string().optional(),
});

export const milestoneSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Milestone title is required'),
  description: z.string().min(1, 'Milestone description is required'),
  budget: z.string().min(1, 'Milestone budget is required'),
  timeline: z.string().min(1, 'Milestone timeline is required'),
});

export const pricingSchema = z.object({
  type: z.enum(['fixed', 'milestone', 'hourly']),
  currency: z.enum(['USD', 'KES']),
  fixedBudget: z.string().optional(),
  milestones: z.array(milestoneSchema).default([]),
  hourlyRate: z.string().optional(),
  estimatedHours: z.string().optional(),
}).refine(
  (data) => data.type !== 'milestone' || (data.milestones && data.milestones.length > 0),
  {
    message: 'Please add at least one milestone for milestone-based pricing.',
    path: ['milestones'],
  }
);

export const startProjectFormSchema = z.object({
  userInfo: userInfoSchema,
  projectDetails: projectDetailsSchema,
  pricing: pricingSchema,
});

export type StartProjectForm = z.infer<typeof startProjectFormSchema>;
