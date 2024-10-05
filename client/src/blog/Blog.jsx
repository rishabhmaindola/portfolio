import axios from 'axios';
import { useEffect, useState } from 'react';
import Post from '../components/Post';
import LatestBlogs from '@/components/LatestBlogs';
import Search from '@/components/Search';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton'

function Blog() {
  const [blogs, setBlogs] = useState([])
  const [allTags, setAllTags] = useState([])
  const [latestBlogs, setLatestBlogs] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [selectedTag, setSelectedTag] = useState('')
  const [loading, setLoading] = useState(true)

  const handleTagSelect = (tag) => {
    setSelectedTag(tag)
  };

  const handleAllTags = (tags) => {
    setAllTags(tags)
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/blogs/all')
      .then(response => {
        setBlogs(response.data.data);
        setFilteredBlogs(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(true);
      });
  }, []);

  useEffect(() => {
    if (selectedTag === '') {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog =>
        blog.tags.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase()))
      );
      setFilteredBlogs(filtered);
    }
  }, [selectedTag, blogs]);

  useEffect(() => {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const latest = blogs.filter(blog => new Date(blog.createdAt) >= twoWeeksAgo);
    setLatestBlogs(latest);
  }, [blogs]);

  if (loading) {
    return (
      <div className="flex flex-col w-full h-full bg-white p-5">
        <div className="flex flex-col py-5">
          <h4 className='font-bold font-baskervville text-4xl mb-5'>Latest</h4>
          <div className='flex gap-4 overflow-x-auto'>
            <Skeleton className="w-80 h-60" />
            <Skeleton className="w-80 h-60" />
            <Skeleton className="w-80 h-60" />
            <Skeleton className="w-80 h-60" />
          </div>
        </div>

        <div className='flex w-full py-5'>
          <div className='flex flex-col w-3/4 px-5'>
            <div className='flex flex-col gap-4'>
              <Skeleton className="h-60 w-full mb-5" />
              <Skeleton className="h-60 w-full mb-5" />
              <Skeleton className="h-60 w-full" />
            </div>
          </div>

          <div className='flex flex-col w-1/4 h-full items-center justify-center'>
            <Skeleton className="h-10 w-3/4 mb-5" />
            <Skeleton className="h-6 w-full mb-5" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (

    <div className='flex flex-col w-full h-full bg-white'>
      <div className='flex flex-col py-5'>
        <h4 className='font-bold font-baskervville text-4xl'>Latest</h4>
        <ScrollArea className='w-full px-5 py-5' orientation="horizontal">
          <div className='flex gap-4'>
            {latestBlogs.map(post => (
              <LatestBlogs key={post._id} title={post.title} tags={post.tags} id={post._id} image={post.images[0]} likes={post.likes} time={post.createdAt} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className='flex w-100% py-5'>
        <div className='flex flex-col w-3/4 '>

          <div className='flex '>
            <div className='flex flex-col w-full px-5 py-5 gap-4'>
              {filteredBlogs.map((post) => (
                <div key={post._id}>
                  <Post key={post._id} title={post.title} description={post.description} tags={post.tags} id={post._id} time={post.createAt} />
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className='flex flex-col w-1/4 h-full items-center justify-center'>
          <Search onTagSelect={handleTagSelect} onTagsFetch={handleAllTags} />
          <div>
            <Label className='font-bold text-lg'>Tags</Label>
            <ul className='flex flex-wrap gap-3 p-5'>
              {allTags.map((tag, index) => (
                <Badge key={index} onClick={() => setSelectedTag(tag)} className={`cursor-pointer ${selectedTag === tag ? 'bg-white text-black' : ''}`} >{tag}</Badge>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Blog