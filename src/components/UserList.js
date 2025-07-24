import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Mail, Phone, Globe, MapPin, Building, Users } from 'lucide-react';

const UserList = () => {
  const [listOfUser, setListOfUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setListOfUser(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="user-card p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        </Card>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4 float-animation">
              Loading Amazing People...
            </h1>
            <p className="text-xl text-muted-foreground">
              Fetching user profiles from around the world
            </p>
          </div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="user-card p-8 text-center max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-4 text-destructive">Oops!</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4 float-animation">
            Meet Our Community
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Discover amazing people from around the world
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <Users className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold text-primary">
              {listOfUser.length} Active Members
            </span>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listOfUser.map((user, index) => (
            <Card 
              key={user.id} 
              className="user-card p-6 group cursor-pointer relative overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* User Header */}
              <div className="flex items-start space-x-4 mb-6 relative z-10">
                <Avatar className="h-16 w-16 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors truncate">
                    {user.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">@{user.username}</p>
                  <Badge variant="secondary" className="text-xs">
                    ID: {user.id}
                  </Badge>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 mb-6 relative z-10">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground truncate">{user.email}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{user.phone}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-sm">
                  <Globe className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground truncate">{user.website}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground truncate">
                    {user.address.city}, {user.address.zipcode}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3 text-sm">
                  <Building className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground truncate">{user.company.name}</span>
                </div>
              </div>

              {/* Company Details */}
              <div className="relative z-10">
                <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
                  <p className="text-sm text-muted-foreground italic">
                    "{user.company.catchPhrase}"
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 opacity-75">
                    {user.company.bs}
                  </p>
                </div>
              </div>

              {/* Hover effect indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground">
            Built with ❤️ using React & JSONPlaceholder API
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default UserList;