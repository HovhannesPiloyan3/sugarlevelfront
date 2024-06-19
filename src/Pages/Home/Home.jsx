import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableCustom from "../../Components/Ui/TableCustom/TableCustom";
import Wallpaper from "../../Components/Wallpaper/Wallpaper";
import SearchCustom from "../../Components/Ui/SearchCustom/SearchCustom";
import TagFilter from "../../Components/Ui/TagFilter/TagFilter";
import axiosInstance from "../../api/axiosInstance";
import { getProducts, productsError } from "../../Features/productsSlice/productsSlice";
import './Home.scss';

const Home = (props) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedTags, setSelectedTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/product/products');
                const products = response.data.map(product => ({
                    ...product,
                    tags: product.tags.split(',').map(tag => tag.trim())
                }));
                dispatch(getProducts(products));
                setFilteredProducts(products);

                // Собираем все уникальные теги
                const tags = new Set();
                products.forEach(product => {
                    product.tags.forEach(tag => tags.add(tag));
                });
                setAllTags([...tags]);
            } catch (err) {
                dispatch(productsError(err.message));
            }
        }
        fetchProducts();
    }, [dispatch]);

    const handleSearch = (value) => {
        setSearchValue(value);
        filterProducts(value, selectedTags);
    };

    const handleTagSelect = (tag) => {
        const newSelectedTags = selectedTags.includes(tag)
            ? selectedTags.filter(t => t !== tag)
            : [...selectedTags, tag];
        setSelectedTags(newSelectedTags);
        filterProducts(searchValue, newSelectedTags);
    };

    const filterProducts = (searchValue, selectedTags) => {
        let filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        if (selectedTags.length > 0) {
            filtered = filtered.filter(product =>
                selectedTags.every(tag => product.tags.includes(tag))
            );
        }
        setFilteredProducts(filtered);
    };

    return (
        <Wallpaper>
            <main className="Home  dark:bg-black">
                <div className="Home-container-search">
                    <div className="Home-container-search-bar">
                        <SearchCustom products={products} onSearch={handleSearch} />
                    </div>
                </div>

                <div className="flex-col flex lg:flex-row">
                    <div className="w-full p-2 lg:p-0 lg:w-3/12 Home-container-table-filters font-bold text-2xl">
                        <span className="bg-gray-100 w-full p-3 rounded-t-2xl dark:bg-gray-700 dark:text-white flex">Фильтры</span>
                        <div className="Home-container-tags mt-5 ">
                            <TagFilter tags={allTags} selectedTags={selectedTags} onTagSelect={handleTagSelect}/>
                        </div>
                    </div>
                    <div className="w-full p-2 lg:p-0 lg:w-3/4">
                        <TableCustom dataSource={filteredProducts}/>
                    </div>
                </div>
            </main>
        </Wallpaper>
    );
};

export default Home;
