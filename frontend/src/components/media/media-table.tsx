import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import RestService from '../../rest/rest-service';
import MediaElement from './media-element';

export interface MediaObject {
    _id: string;
    qr: string;
    title: string;
    uploadDate: string;
    videoPath: string;
}

interface IMediaTableProps {
    media: MediaObject[];
}

const MediaTable: FC<IMediaTableProps> = ({ media }) => {


    if (!media) {
        return null;
    }

    return (<TableContainer>
        <Table variant='simple'>
            <TableCaption>Your Media</TableCaption>
            <Thead>
                <Tr>
                    <Th>Title</Th>
                    <Th>QR Data</Th>
                    <Th>Uploaded</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {buildRows()}
            </Tbody>
        </Table>
    </TableContainer>);

    function buildRows(): JSX.Element[] {
        return media.map((obj) => {
            return (<MediaElement key={obj._id} _id={obj._id} qr={obj.qr} title={obj.title} uploadDate={obj.uploadDate} />);
        })
    }

};
export default MediaTable;