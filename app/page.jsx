import directus from '../lib/directus';
import { readItems } from '@directus/sdk'

export default async function Home() {
  
  async function getGlobals() {
    return directus.request(readItems('pages'));
  }
  
  const global = await getGlobals();

  return (
    <div>
      <h1>Lista</h1>
      {global.map((item) => {
        return(
          <>
          <h2>{item.title}</h2>
          <h4>{item.content}</h4>
          </>
        )
      })}

    </div>
  );
}
