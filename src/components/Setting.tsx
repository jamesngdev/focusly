import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.tsx';
import { FaScrewdriverWrench } from 'react-icons/fa6';
import {
  FOCUS_TIME_SETTING_KEY,
  QUIZLET_SETS_ID_SETTING_KEY,
  RELAX_TIME_SETTING_KEY,
} from '@/consts/setting.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FiMaximize } from 'react-icons/fi';
import { toggleFullScreen } from '@/lib/helpers.ts';

('use client');

const FormSchema = z.object({
  [QUIZLET_SETS_ID_SETTING_KEY]: z.string(),
  [FOCUS_TIME_SETTING_KEY]: z.string(),
  [RELAX_TIME_SETTING_KEY]: z.string(),
});

function SettingForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      [QUIZLET_SETS_ID_SETTING_KEY]:
        localStorage.getItem(QUIZLET_SETS_ID_SETTING_KEY) ?? '',
      [FOCUS_TIME_SETTING_KEY]:
        localStorage.getItem(FOCUS_TIME_SETTING_KEY) ?? '',
      [RELAX_TIME_SETTING_KEY]:
        localStorage.getItem(RELAX_TIME_SETTING_KEY) ?? '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    for (const settingKey of Object.keys(data)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const value: any = data[settingKey] as any;
      localStorage.setItem(settingKey, value);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name={QUIZLET_SETS_ID_SETTING_KEY}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quizlet set id</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={FOCUS_TIME_SETTING_KEY}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Focus Time (minutes)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={RELAX_TIME_SETTING_KEY}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relax Time (minutes)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
}

const Setting = () => {
  return (
    <>
      <div className="fixed bottom-4 left-5  z-50">
        <div
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl cursor-pointer"
          onClick={toggleFullScreen}
        >
          <FiMaximize />
        </div>
      </div>
      <div className="fixed bottom-4 left-16  z-50">
        <Popover>
          <PopoverTrigger>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl cursor-pointer">
              <FaScrewdriverWrench />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <SettingForm />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default Setting;
