import { MantineListInferencer } from "@refinedev/inferencer/mantine";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
  Icon
} from "@tremor/react";
import { MdModeEditOutline, MdDeleteForever } from 'react-icons/md'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group } from '@mantine/core';


import { useEffect, useState, useCallback } from "react";

type Jurnallar = {
  id: number;
  title: string;
  addedDate: string;
  creationDate: string;
  author: string;
  description: string;
  fileData: string;
  photoData: string;
  genre: string;
  privateStatus: boolean;
}





// const data = [
//   {
//     author_name: "Viola Amherd",
//     date_added: "12-03-2022",
//     date_created:
//       "12-03-2022",
//       description: "Simple jurnal with vector animation",
//       name: "Simple jurnal with vector animation",
//       category: "ITIF",
//     status: "active",
//   },
//   {
//     author_name: "Simonetta Sommaruga",
//     date_added: "12-03-2022",
//     date_created:
//       "12-03-2022",
//     description: "Simple jurnal with vector animation",
//     name: "Simple jurnal with vector animation",
//     category: "ITIF",
//     status: "active",
//   },
//   {
//     author_name: "Alain Berset",
//     date_added: "12-03-2022",
//     date_created: "12-03-2022",
//     description: "Simple jurnal with vector animation",
//     name: "Simple jurnal ",
//     category: "ITIF",
//     status: "active",
//   },
//   {
//     author_name: "Ignazio Cassis",
//     date_added: "12-03-2022",
//     date_created: "12-03-2022",
//     description: "Simple jurnal with vector animation",
//     name: "Simple jurnal with vector animation",
//     category: "ITIF",
//     status: "active",
//   },
//   {
//     author_name: "Ueli Maurer",
//     date_added: "12-03-2022",
//     date_created: "12-03-2022",
//     description: "Simple jurnal with vector animation",
//     name: "Simple jurnal with vector animation",
//     category: "ITIF",
//     status: "active",
//   },
//   {
//     author_name: "Guy Parmelin",
//     date_added: "12-03-2022",
//     date_created:
//       "12-03-2022",
//       description: "Simple jurnal with vector animation",
//       name: "Simple jurnal ",
//       category: "ITIF",
//     status: "active",
//   },
//   {
//     author_name: "Karin Keller-Sutter",
//     date_added: "12-03-2022",
//     date_created: "12-03-2022",
//     description: "Simple jurnal with vector animation",
//     name: "Simple jurnal ",
//     category: "ITIF",
//     status: "active",
//   },
// ];

export default function BlogPostList() {
  // return <MantineListInferencer />;


  const [jurnallar, setJurnallar] = useState<Jurnallar[]>([]);
  const [newJurnallar] = useState<Jurnallar[]>([])
  const [opened, { open, close }] = useDisclosure(false);
  const [author, setAuthor] = useState('')
  const [stat, setStat] = useState('')
  const [description, setDescription] = useState('')
  const [genre, setGenre] = useState('')
  const [jurnal, setJurnal] = useState('')

  // useEffect(() =>{

  //   const fetchData = async() => {
  //     const data = await fetch('https://localhost:7264/api/books');
  //     const finalData = await data.json();

  //     setJurnallar(finalData);
  //   }

  //   fetchData();
  //   console.log(jurnallar)

  // },[])

  const fetchBooks = useCallback(async () => {
    try {
      const response = await fetch(`https://localhost:7264/api/books`);
      const data = await response.json();
      setJurnallar([])
      data.forEach(el => {
        newJurnallar.push({
          id: el.id,
          title: el.title,
          description: el.description,
          genre: el.genre,
          author: el.author,
          creationDate: el.creationDate,
          addedDate: el.addedDate,
          privateStatus: el.privateStatus,
          photoData: el.photoData,
          fileData: el.fileData
        });
      })

      setJurnallar(newJurnallar);
      console.log(newJurnallar)

    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, []);


  const deleteFunction =async (id: number) => {
      const data = await fetch(`https://localhost:7264/api/books/${id}`,{
        method:'DELETE',
        headers:{
          'content-type': "application/json"
        }
      })

      console.log(data.json())
  }


  const editFunction = async () => {
      setAuthor('')
      setDescription('')
      setGenre('')
      setJurnal('')
      setStat('')

  }


  return (
    <>
      <Modal opened={opened}
        onClose={close}
        title="Jurnalı redaktə et"
        overlayBlur={1}
        overlayOpacity={0.45}
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <form action="#">
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Müəllif Adı</label>
                        <input value={author} onChange={(e)=>setAuthor(e.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  required />
                    </div>
                    <div>
                        <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jurnal Adı</label>
                        <input value={jurnal} onChange={(e)=>setJurnal(e.target.value)} type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  required />
                    </div>
                    <div>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Janr</label>
                        <input value={genre} onChange={(e)=>setGenre(e.target.value)} type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  required />
                    </div>
                    <div>
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                        <select value={stat} onChange={(e)=>setStat(e.target.value)} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option value="Açıq">Açıq</option>
                            <option value="Bağlı" selected>Bağlı</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Açıqlama</label>
                        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"   ></textarea>                    
                    </div>
                </div>
                <button onClick={()=>editFunction()} type="submit" className="bg-blue-500 text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Redaktə et
                </button>
            </form>
        </div>
    </div>
      </Modal>


      <Card>
        <Title className="text-black font-semibold mb-3 text-3xl">Jurnallar</Title>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell className='font-bold'>ID</TableHeaderCell>
              <TableHeaderCell className='font-bold'>Müəllif Adı</TableHeaderCell>
              <TableHeaderCell className='font-bold'>Əlavə edilib</TableHeaderCell>
              <TableHeaderCell className='font-bold'>Yaradılma tarixi</TableHeaderCell>
              <TableHeaderCell className='font-bold'>Açıqlama</TableHeaderCell>
              <TableHeaderCell className='font-bold'>Jurnal Adı</TableHeaderCell>
              <TableHeaderCell className='font-bold'>Janr</TableHeaderCell>
              <TableHeaderCell className='font-bold'>Status</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newJurnallar.map((jurnal) => (
              <TableRow key={jurnal.id}>
                <TableCell >{jurnal.id}</TableCell>
                <TableCell >{jurnal.author}</TableCell>
                <TableCell >
                  <Text>{jurnal.addedDate.slice(0, 10)}</Text>
                </TableCell>
                <TableCell>
                  <Text>{jurnal.creationDate.slice(0, 10)}</Text>
                </TableCell>
                <TableCell>
                  <Text>{jurnal.description}</Text>
                </TableCell>
                <TableCell>
                  <Text>{jurnal.title}</Text>
                </TableCell>
                <TableCell>
                  <Text>{jurnal.genre}</Text>
                </TableCell>
                <TableCell>
                  {jurnal.privateStatus == true ? (<Badge color="lime">
                    {"açıq"}
                  </Badge>) : (<Badge color="red">
                    {"bağlı"}
                  </Badge>)
                  }
                </TableCell>
                <TableCell>
                  <MdModeEditOutline className="edit-btn" key={jurnal.id} onClick={open} />
                </TableCell>
                <TableCell>
                  <MdDeleteForever className="edit-btn" key={jurnal.id} onClick={()=>deleteFunction(jurnal.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

    </>
  )
}

export const getServerSideProps = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (!authenticated) {
    return {
      props: {
        ...translateProps,
      },
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/blog-posts")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translateProps,
    },
  };
};
