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
} from "@tremor/react";

import { useEffect, useState } from "react";

// type Jurnallar = {
//   id : number;
//   title: string;
//   dateAdded: string;
//   createdDate: string;
//   author: string;
//   description: string;
//   fileName: string;
//   fileContent: string;
//   imageUrl: string;
//   genre: string;
//   privateStatus: boolean;
// }

// const [jurnallar,setJurnallar] = useState([]);

// useEffect(() =>{

//     fetch('https://localhost:7264/api/books').then(res=>res.json())
//     .then(data=>{
//       setJurnallar(data)
//     })
    
//     console.log(jurnallar)

// },[])


const data = [
  {
    author_name: "Viola Amherd",
    date_added: "12-03-2022",
    date_created:
      "12-03-2022",
      description: "Simple jurnal with vector animation",
      name: "Simple jurnal with vector animation",
      category: "ITIF",
    status: "active",
  },
  {
    author_name: "Simonetta Sommaruga",
    date_added: "12-03-2022",
    date_created:
      "12-03-2022",
    description: "Simple jurnal with vector animation",
    name: "Simple jurnal with vector animation",
    category: "ITIF",
    status: "active",
  },
  {
    author_name: "Alain Berset",
    date_added: "12-03-2022",
    date_created: "12-03-2022",
    description: "Simple jurnal with vector animation",
    name: "Simple jurnal ",
    category: "ITIF",
    status: "active",
  },
  {
    author_name: "Ignazio Cassis",
    date_added: "12-03-2022",
    date_created: "12-03-2022",
    description: "Simple jurnal with vector animation",
    name: "Simple jurnal with vector animation",
    category: "ITIF",
    status: "active",
  },
  {
    author_name: "Ueli Maurer",
    date_added: "12-03-2022",
    date_created: "12-03-2022",
    description: "Simple jurnal with vector animation",
    name: "Simple jurnal with vector animation",
    category: "ITIF",
    status: "active",
  },
  {
    author_name: "Guy Parmelin",
    date_added: "12-03-2022",
    date_created:
      "12-03-2022",
      description: "Simple jurnal with vector animation",
      name: "Simple jurnal ",
      category: "ITIF",
    status: "active",
  },
  {
    author_name: "Karin Keller-Sutter",
    date_added: "12-03-2022",
    date_created: "12-03-2022",
    description: "Simple jurnal with vector animation",
    name: "Simple jurnal ",
    category: "ITIF",
    status: "active",
  },
];

export default function BlogPostList() {
  // return <MantineListInferencer />;
  return(
    <Card>
    <Title className="text-black font-semibold mb-3 text-3xl">Jurnallar</Title>
    <Table className="mt-5">
      <TableHead>
        <TableRow>
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
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell >{item.author_name}</TableCell>
            <TableCell >
              <Text>{item.date_added}</Text>
            </TableCell>
            <TableCell>
              <Text>{item.date_created}</Text>
            </TableCell>
            <TableCell>
              <Text>{item.description}</Text>
            </TableCell>
            <TableCell>
              <Text>{item.name}</Text>
            </TableCell>
            <TableCell>
              <Text>{item.category}</Text>
            </TableCell>
            <TableCell>
              <Badge color="emerald">
                {item.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
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
