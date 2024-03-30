import {Button} from './Buttons';

export function ComponentSample() {
  return (
    <div>
      <div className='flex justify-between'>
        <Button variant='primary'>Primary</Button>
        <Button>Secondary</Button>
        <Button variant='destructive'>Destructive</Button>
        <Button variant='discret'>Discret</Button>
      </div>
      <div className='flex justify-between'>
        <Button outline variant='primary'>Primary</Button>
        <Button outline>Secondary</Button>
        <Button outline variant='destructive'>Destructive</Button>
        <Button outline variant='discret'>Discret</Button>
      </div>
      <div className='flex justify-between'>
        <Button icon variant='primary'>Primary</Button>
        <Button icon>Secondary</Button>
        <Button icon variant='destructive'>Destructive</Button>
        <Button icon variant='discret'>Discret</Button>
      </div>
      <div className='flex justify-between'>
        <Button icon outline variant='primary'>Primary</Button>
        <Button icon outline>Secondary</Button>
        <Button icon outline variant='destructive'>Destructive</Button>
        <Button icon outline variant='discret'>Discret</Button>
      </div>
    </div>
  );
}

export const code = `
  <Button variant='primary'>Primary</Button>
  <Button outline variant='primary'>Primary</Button>
  <Button icon variant='primary'>Primary</Button>
  <Button icon outline variant='primary'>Primary</Button>
`;