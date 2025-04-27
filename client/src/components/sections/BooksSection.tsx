import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import BooksIcon from "@/components/icons/BooksIcon";
import { fadeInUp, staggerContainer, staggerItems } from "@/lib/animation";

const books = [
  {
    id: 1,
    title: "The Art of Food Photography",
    description: "A comprehensive guide to food styling and photography techniques.",
    year: "2022",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
  },
  {
    id: 2,
    title: "Landscape Photography Essentials",
    description: "Capturing the beauty of natural landscapes across all seasons.",
    year: "2021",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1976&q=80"
  },
  {
    id: 3,
    title: "Light & Shadow: Portrait Techniques",
    description: "Master the art of portrait lighting for stunning images.",
    year: "2020",
    image: "https://images.unsplash.com/photo-1603289847962-9e00e4944868?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
  }
];

const BooksSection = () => {
  return (
    <motion.section
      className="min-h-screen container mx-auto px-4 md:px-6 py-16"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div 
        className="flex items-center mb-12"
        variants={fadeInUp}
      >
        <BooksIcon className="w-8 h-8 mr-3 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold">BOOKS</h1>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={staggerItems}
      >
        {books.map((book, index) => (
          <motion.div 
            key={book.id}
            variants={fadeInUp}
            custom={index}
            className="group"
          >
            <Card className="bg-card rounded-lg overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
              <div className="h-80 overflow-hidden">
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                <p className="text-muted-foreground">{book.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-primary text-sm">{book.year}</span>
                  <a href="#" className="text-foreground hover:text-primary transition-colors">Read More →</a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      <Navigation currentSection="books" />
    </motion.section>
  );
};

export default BooksSection;
