import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import BooksIcon from "@/components/icons/BooksIcon";
import { fadeInUp, staggerContainer } from "@/lib/animation";

const books = [
  {
    id: 1,
    title: "Computer Networking: A Top-Down Approach",
    description: "By Kurose & Ross - A comprehensive introduction to computer networking concepts and protocols.",
    year: "2021"
  },
  {
    id: 2,
    title: "The Linux Command Line: A Complete Introduction",
    description: "By William E. Shotts Jr. - A comprehensive guide to mastering the Linux command line interface.",
    year: "2019"
  }
];

const BooksSection = () => {
  return (
    <motion.section
      className="min-h-screen container mx-auto py-10 md:py-16 flex flex-col justify-center"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        <motion.div 
          className="flex items-center mb-8"
          variants={fadeInUp}
        >
          <BooksIcon className="w-8 h-8 mr-3 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">BOOKS</h1>
        </motion.div>
        
        <motion.div 
          className="space-y-6"
          variants={fadeInUp}
        >
          {books.map((book) => (
            <div key={book.id} className="bg-card p-5 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
              <p className="text-muted-foreground mb-3">{book.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary text-sm">{book.year}</span>
                <a href="#" className="text-foreground hover:text-primary transition-colors">Read More →</a>
              </div>
            </div>
          ))}
          
          <div className="bg-card p-5 rounded-lg border border-dashed border-primary">
            <p className="text-center text-muted-foreground italic">
              Currently I'm working on multiple things so whenever I get the time to update the book shelf I will update this section.
            </p>
          </div>
        </motion.div>
        
        <Navigation currentSection="books" />
      </div>
    </motion.section>
  );
};

export default BooksSection;
