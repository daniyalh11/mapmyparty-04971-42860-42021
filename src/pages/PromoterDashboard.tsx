import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PromoterOverview from "@/components/promoter/PromoterOverview";
import PromoterEvents from "@/components/promoter/PromoterEvents";
import PromoterOrganizers from "@/components/promoter/PromoterOrganizers";
import PromoterAnalytics from "@/components/promoter/PromoterAnalytics";
import PromoterLiveEvents from "@/components/promoter/PromoterLiveEvents";

const PromoterDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated userRole="promoter" />

      <main className="flex-1 py-12">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Promoter Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Manage and promote events from all organizers
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="organizers">Organizers</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="live">Live Events</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <PromoterOverview />
              <PromoterLiveEvents />
            </TabsContent>

            <TabsContent value="events">
              <PromoterEvents />
            </TabsContent>

            <TabsContent value="organizers">
              <PromoterOrganizers />
            </TabsContent>

            <TabsContent value="analytics">
              <PromoterAnalytics />
            </TabsContent>

            <TabsContent value="live">
              <PromoterLiveEvents />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PromoterDashboard;
