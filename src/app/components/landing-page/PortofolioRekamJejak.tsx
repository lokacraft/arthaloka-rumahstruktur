"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  collection,
  query,
  getDocs,
  where,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/components/ui/tabs";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/pagination";
import { Search, MapPin, Calendar, Briefcase, Filter, FilterIcon } from "lucide-react";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Badge } from "@/app/components/ui/badge";
import {
      Empty,
      EmptyContent,
      EmptyDescription,
      EmptyHeader,
      EmptyMedia,
      EmptyTitle,
    } from "@/app/components/ui/empty"
import { SearchX } from "lucide-react";
import Link from "next/link";

// --- Tipe Data ---
interface PortfolioCategory {
  id: string;
  name: string;
}

interface Portfolio {
  id: string;
  title: string;
  slug: string;
  klien: string;
  lokasi: string;
  tahun: string; // Bisa string atau number
  status: string;
  portofolioCategoryId: string;
}

const ITEMS_PER_PAGE = 10;

export default function PortofolioRekamJejak() {
  // State Data
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  // State Filter & Search
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLokasi, setFilterLokasi] = useState("all");
  const [filterTahun, setFilterTahun] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setfilterCategory] = useState("all");

  // State Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const q = query(collection(db, "portofolioCategory")); // Sesuaikan nama koleksi
        const snapshot = await getDocs(q);
        const cats = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // 2. Fetch Portfolios (Realtime)
  useEffect(() => {
    setLoading(true);
    // Kita ambil semua dulu untuk kemudahan filtering di client-side 
    // (bisa dioptimalkan dengan query compound jika data sangat besar)
    const q = query(collection(db, "portofolio"), orderBy("tahun", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Portfolio[];
      setPortfolios(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching portfolios:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const activeCategories = useMemo(() => {
      // 1. Ambil semua ID kategori yang digunakan dalam portofolio yang ada
      const usedCategoryIds = new Set(portfolios.map(p => p.portofolioCategoryId));
  
      // 2. Filter daftar kategori master, hanya ambil yang ID-nya ada di Set di atas
      return categories.filter(cat => usedCategoryIds.has(cat.id));
    }, [categories, portfolios]);

  // 3. Filtering Logic
  const filteredData = useMemo(() => {
    return portfolios.filter((item) => {
      console.log(selectedCategory, " - ", item.portofolioCategoryId);
      // Filter by Category Tab
      const categoryMatch = selectedCategory === "all" 
        ? true 
        : item.portofolioCategoryId === selectedCategory;
      // Filter by Search (Title)
      const searchMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by Lokasi
      const lokasiMatch = filterLokasi === "all" || item.lokasi === filterLokasi;
      
      // Filter by Tahun
      const tahunMatch = filterTahun === "all" || String(item.tahun) === filterTahun;

      // Filter by Status (Pekerjaan)
      const statusMatch = filterStatus === "all" || item.status === filterStatus;

      return categoryMatch && searchMatch && lokasiMatch && tahunMatch && statusMatch;
      
    });
  }, [portfolios, searchQuery, selectedCategory, filterLokasi, filterTahun, filterStatus, filterCategory]);

  // 4. Pagination Logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Helper untuk mendapatkan nama kategori berdasarkan ID
  const getCategoryName = (id: string) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.name : "-";
  };

  // Extract unique values for filters
  const uniqueLocations = Array.from(new Set(portfolios.map(p => p.lokasi))).sort();
  const uniqueYears = Array.from(new Set(portfolios.map(p => p.tahun))).sort((a, b) => Number(b) - Number(a));
  const uniqueStatuses = Array.from(new Set(portfolios.map(p => p.status))).sort();
  const uniqueCategories = Array.from(new Set(portfolios.map(p => p.portofolioCategoryId))).sort();

  const renderTable = () => (
      <div className="rounded-xl border border-gray-200 overflow-hidden mt-6">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[50px] text-center font-bold text-gray-700">No</TableHead>
              <TableHead className="font-bold text-gray-700">Nama Proyek</TableHead>
              <TableHead className="font-bold text-gray-700">Klien</TableHead>
              <TableHead className="font-bold text-gray-700">Lokasi</TableHead>
              <TableHead className="font-bold text-gray-700">Layanan</TableHead>
              <TableHead className="font-bold text-gray-700">Tahun</TableHead>
              <TableHead className="font-bold text-gray-700 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={7}><Skeleton className="h-8 w-full" /></TableCell>
                </TableRow>
              ))
            ) : paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <TableRow key={item.id} className="hover:bg-gray-50/50">
                  <TableCell className="text-center font-medium">
                    {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                  </TableCell>
                  <TableCell className="font-semibold text-gray-900">
                    <Link href={`/portofolio/${item.slug}`}>
                    {item.title}
                    </Link>
                    </TableCell>
                  <TableCell>{item.klien}</TableCell>
                  <TableCell>{item.lokasi}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-normal">
                      {getCategoryName(item.portofolioCategoryId)}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.tahun}</TableCell>
                  <TableCell className="text-right">
                    <Badge className={
                      item.status === 'Selesai' ? "bg-green-100 text-green-700 hover:bg-green-200 shadow-none" : 
                      item.status === 'Berjalan' ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 shadow-none" : 
                      "bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-none"
                    }>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-gray-500">
                  <Empty>
                        <EmptyHeader>
                              <EmptyMedia variant="icon">
                                    <SearchX />
                              </EmptyMedia>
                              <EmptyTitle>Oops</EmptyTitle>
                              <EmptyDescription>
                              Tidak ada data proyek yang ditemukan.
                              </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                        </EmptyContent>
                  </Empty>
                  </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );


  return (
    <section className="w-full py-12 font-clash">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">Rekam Jejak Proyek</h2>
          <p className="text-gray-500">Daftar lengkap portofolio pekerjaan yang telah kami selesaikan.</p>
        </div>

        {/* --- SECTION 1: TABS KATEGORI --- */}
        <Tabs defaultValue="all" className="w-full" onValueChange={(val) => { console.log("val : ", val); setSelectedCategory(val); setCurrentPage(1); }}>
          <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent justify-start p-0 mb-6">
            <TabsTrigger 
              value="all" 
              className="rounded-full border border-gray-200 px-6 py-2 data-[state=active]:bg-[#008080] data-[state=active]:text-white data-[state=active]:border-[#008080]"
            >
              Semua Proyek
            </TabsTrigger>
            {/* {activeCategories.map((cat) => (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="rounded-full border border-gray-200 px-6 py-2 data-[state=active]:bg-[#008080] data-[state=active]:text-white data-[state=active]:border-[#008080]"
              >
                {cat.name}
              </TabsTrigger>
            ))} */}
          </TabsList>
        {/* --- SECTION 2: SEARCH & FILTER --- */}
        <div className="flex flex-col lg:flex-row gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Cari nama proyek..." 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="pl-9 bg-white border-gray-200"
            />
          </div>

          {/* Filters Group */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* 1. Filter Kategori (Sekarang Dropdown) */}
            <Select value={selectedCategory} onValueChange={(val) => { setSelectedCategory(val); setCurrentPage(1); }}>
                  <SelectTrigger className="w-full bg-white border-gray-200">
                    <div className="flex items-center gap-2 text-gray-600 truncate">
                      <FilterIcon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{selectedCategory === 'all' ? 'Semua Kategori' : getCategoryName(selectedCategory)}</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {activeCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

            {/* Filter Lokasi */}
            <Select value={filterLokasi} onValueChange={(val) => { setFilterLokasi(val); setCurrentPage(1); }}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{filterLokasi === 'all' ? 'Semua Lokasi' : filterLokasi}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Lokasi</SelectItem>
                {uniqueLocations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
              </SelectContent>
            </Select>

            {/* Filter Tahun */}
            <Select value={filterTahun} onValueChange={(val) => { setFilterTahun(val); setCurrentPage(1); }}>
              <SelectTrigger className="w-full sm:w-[160px] bg-white border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{filterTahun === 'all' ? 'Semua Tahun' : filterTahun}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tahun</SelectItem>
                {uniqueYears.map(year => <SelectItem key={year} value={String(year)}>{year}</SelectItem>)}
              </SelectContent>
            </Select>

            {/* Filter Status (Pekerjaan) */}
            <Select value={filterStatus} onValueChange={(val) => { setFilterStatus(val); setCurrentPage(1); }}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  <span className="truncate">{filterStatus === 'all' ? 'Semua Status' : filterStatus}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                {uniqueStatuses.map((stat, index) => <SelectItem key={index} value={stat}>{stat}</SelectItem>)}
              </SelectContent>
            </Select>
            
          </div>
        </div>
        {/* Tab Content untuk "all" */}
        <TabsContent value="all" className="bg-white rounded-xl p-4">
             {renderTable()}
          </TabsContent>

          {/* Tab Content untuk setiap kategori dinamis */}
          {/* {activeCategories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id}  className="bg-white rounded-xl p-4">
               {renderTable()}
            </TabsContent>
          ))} */}
        </Tabs>

        {/* --- PAGINATION --- */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
             <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); if(currentPage > 1) setCurrentPage(p => p - 1); }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {/* Logic Simple Pagination Numbering */}
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  // Tampilkan halaman pertama, terakhir, dan sekitar halaman aktif
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink 
                          href="#" 
                          isActive={currentPage === page}
                          onClick={(e) => { e.preventDefault(); setCurrentPage(page); }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <PaginationItem key={page}><span className="px-2">...</span></PaginationItem>;
                  }
                  return null;
                })}

                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); if(currentPage < totalPages) setCurrentPage(p => p + 1); }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

      </div>
    </section>
  );
}